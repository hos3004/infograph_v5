const FPS = 30;
const PROJECT_TYPE = 'personalities';
const RENDER_MODEL = 'personalities';
const DEFAULT_IMAGE_DURATION_MS = 8000;
const TIMELINE_TOLERANCE_MS = 1000;
const PROJECT_AUTOSAVE_DELAY_MS = 1600;

const presets = window.PersonalityPresets || { visualStyles: {}, defaults: {} };

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  ttsModel: 'gemini-2.5-flash-preview-tts',
  ttsVoice: 'Charon',
  ttsStylePrompt: 'Arabic television documentary narrator. Speak in Modern Standard Arabic with a calm, authoritative news-report tone. Use a medium measured pace and clear articulation.',
  contentModel: 'gemini-2.5-flash',
};

const state = {
  assets: { overlays: [], music: [], endpage: [] },
  appVersion: '1.0.0',
  project: { currentProjectPath: '', projectName: 'Personalities Project', isDirty: false, isSaving: false, lastSavedAt: null, autosaveEnabled: true, createdAt: null },
  placeholderPath: null,
  slides: [],
  music: '',
  voiceover: null,
  voiceoverVolume: 100,
  voiceoverDurationMs: 0,
  endPage: 'endpage.mp4',
  endPageDurationFrames: 0,
  slideDurationInSeconds: 5,
  effects: [],
  selectedSlideId: null,
  draggedSlideId: null,
  dragOverSlideId: null,
  isRendering: false,
  previewPlaying: false,
  previewMuted: false,
  previewPositionMs: 0,
  previewRafId: null,
  previewStartedAt: 0,
  settings: { ...DEFAULT_SETTINGS },
  content: {
    mainScript: '',
    sceneCount: 12,
    customSceneCount: 12,
    visualStyle: 'egyptianDocumentary',
    voiceDialect: 'msa',
    diacritics: false,
    characterReference: presets.defaults?.characterReference || '',
    globalRules: presets.defaults?.globalRules || '',
    prisonRules: presets.defaults?.prisonRules || '',
    timeRules: presets.defaults?.timeRules || '',
    scenes: [],
    mainVoiceoverPath: '',
    mainVoiceoverUrl: '',
    mainVoiceoverDurationMs: 0,
  },
};

const $ = (id) => document.getElementById(id);
const elements = {
  brandLogo: $('brand-logo'), projectSaveBtn: $('project-save-btn'), projectOpenBtn: $('project-open-btn'), projectSaveStatus: $('project-save-status'),
  musicSelect: $('music-select'), musicVolumeInput: $('music-volume-input'), musicVolumeValue: $('music-volume-value'),
  pickVoiceoverBtn: $('pick-voiceover-btn'), clearVoiceoverBtn: $('clear-voiceover-btn'), voiceoverFilename: $('voiceover-filename'), voiceoverMeta: $('voiceover-meta'), voiceoverVolumeInput: $('voiceover-volume-input'), voiceoverVolumeValue: $('voiceover-volume-value'), endPageSelect: $('endpage-select'), endPageDurationHint: $('endpage-duration-hint'),
  pickSlidesBtn: $('pick-slides-btn'), slidesList: $('slides-list'), slidesCount: $('slides-count'), slidesTimelineSummary: $('slides-timeline-summary'), emptyState: $('empty-state'),
  runtimeSummary: $('runtime-summary'), previewStage: $('preview-exact-root'), previewPlayBtn: $('preview-play-btn'), previewRestartBtn: $('preview-restart-btn'), previewMuteBtn: $('preview-mute-btn'), previewFullscreenBtn: $('preview-fullscreen-btn'), previewSeek: $('preview-seek'), previewTimeInline: $('preview-time-inline'), previewStageShell: $('preview-stage-shell'),
  statusTitle: $('status-title'), statusText: $('status-text'), progressLabel: $('progress-label'), progressPercent: $('progress-percent'), progressFill: $('progress-fill'), renderResult: $('render-result'), renderBtn: $('render-btn'), cancelRenderBtn: $('cancel-render-btn'), openOutputBtn: $('open-output-btn'),
  mainScriptInput: $('main-script-input'), sceneCountSelect: $('scene-count-select'), customSceneCountWrap: $('custom-scene-count-wrap'), customSceneCountInput: $('custom-scene-count-input'), visualStyleSelect: $('visual-style-select'), voiceDialectSelect: $('voice-dialect-select'), diacriticsCheckbox: $('diacritics-checkbox'), generateMainVoiceoverBtn: $('generate-main-voiceover-btn'), mainVoiceoverStatus: $('main-voiceover-status'), scriptStats: $('script-stats'),
  characterReferenceInput: $('character-reference-input'), globalRulesInput: $('global-rules-input'), prisonRulesInput: $('prison-rules-input'), timeRulesInput: $('time-rules-input'), generateScenesBtn: $('generate-scenes-btn'), contentStatus: $('content-status'), scenesList: $('scenes-list'), scenesSummary: $('scenes-summary'),
};

let autosaveTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;

function createId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
function isVideoPath(path) { return /\.(mp4|mov|webm|mkv)$/i.test(String(path || '')); }
function prettifyPath(fullPath) { if (!fullPath) return ''; const parts = fullPath.split(/[/\\]/); return parts[parts.length - 1]; }
function formatDuration(ms) { const sec = Math.max(0, Number(ms || 0)) / 1000; const m = Math.floor(sec / 60); const s = Math.floor(sec % 60); return `${m}:${String(s).padStart(2, '0')}`; }
function escapeHtml(value) { return String(value || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function toFileUrl(path) { return window.desktopApi?.toFileUrl ? window.desktopApi.toFileUrl(path) : path; }

function isVideoSlide(slide) { return slide?.mediaType === 'video' || isVideoPath(slide?.imagePath); }

function getSlideEffectiveDurationMs(slide) {
  if (!slide) return 0;
  if (isVideoSlide(slide)) {
    const start = Number(slide.trimStartMs || 0);
    let end;
    if (slide.trimEndMs != null && slide.trimEndMs > 0) {
      end = Number(slide.trimEndMs);
    } else if (slide.mediaDurationMs && slide.mediaDurationMs > 0) {
      end = Number(slide.mediaDurationMs);
    } else if (slide.durationMs && slide.durationMs > 0) {
      end = Number(slide.durationMs);
    } else {
      return 0;
    }
    return Math.max(0, end - start);
  }
  return slide.durationMs > 0 ? Number(slide.durationMs) : DEFAULT_IMAGE_DURATION_MS;
}

function getSlidesTimelineDurationMs(slides) {
  return (Array.isArray(slides) ? slides : []).reduce((sum, slide) => sum + getSlideEffectiveDurationMs(slide), 0);
}

function getMainVoiceoverDurationMs() {
  return Number(state.content.mainVoiceoverDurationMs || state.voiceoverDurationMs || 0);
}

function getTimelineDelta() {
  const audioMs = getMainVoiceoverDurationMs();
  const slidesMs = getSlidesTimelineDurationMs(state.slides);
  return audioMs > 0 ? slidesMs - audioMs : slidesMs;
}

function formatSignedDuration(deltaMs) {
  const abs = Math.abs(deltaMs);
  const sign = deltaMs < 0 ? '-' : '+';
  return `${sign} ${formatDuration(abs)}`;
}

function validateTimelineBeforeRender() {
  const audioMs = getMainVoiceoverDurationMs();
  const slidesMs = getSlidesTimelineDurationMs(state.slides);
  if (!state.slides.length) {
    return { allowed: false, level: 'error', message: 'لا توجد شرائح للرندر.', audioMs, slidesMs };
  }
  if (audioMs > 0 && slidesMs < audioMs) {
    const diff = audioMs - slidesMs;
    if (diff <= TIMELINE_TOLERANCE_MS) {
      return { allowed: true, level: 'info', message: 'المدة متطابقة تقريبًا', audioMs, slidesMs };
    }
    return { allowed: true, level: 'warning', message: `مدة الشرائح أقل من مدة الصوت بـ ${formatDuration(diff)}. سيتم تمديد آخر شريحة حتى نهاية الصوت.`, audioMs, slidesMs };
  }
  if (audioMs > 0 && slidesMs > audioMs) {
    const diff = slidesMs - audioMs;
    if (diff <= TIMELINE_TOLERANCE_MS) {
      return { allowed: true, level: 'info', message: 'المدة متطابقة تقريبًا', audioMs, slidesMs };
    }
    return { allowed: true, level: 'warning', message: `مدة الشرائح أطول من الصوت بـ ${formatDuration(diff)}. سيتم إنهاء الفيديو عند نهاية الصوت.`, audioMs, slidesMs };
  }
  if (audioMs <= 0) {
    return { allowed: true, level: 'info', message: 'لا يوجد صوت رئيسي. مدة الفيديو ستعتمد على مدة الشرائح.', audioMs: 0, slidesMs };
  }
  return { allowed: true, level: 'info', message: '', audioMs, slidesMs };
}

async function readAudioDurationMs(fileUrl, fallbackMs = 0) {
  if (!fileUrl) return fallbackMs;
  return new Promise((resolve) => {
    const audio = document.createElement('audio');
    let done = false;
    const finish = (value) => { if (done) return; done = true; audio.remove(); resolve(value); };
    const timeout = setTimeout(() => finish(fallbackMs), 8000);
    audio.preload = 'metadata';
    audio.src = fileUrl;
    audio.onloadedmetadata = () => {
      clearTimeout(timeout);
      finish(Number.isFinite(audio.duration) && audio.duration > 0 ? Math.round(audio.duration * 1000) : fallbackMs);
    };
    audio.onerror = () => { clearTimeout(timeout); finish(fallbackMs); };
  });
}

function getSelectedSceneCount() { return Number(elements.sceneCountSelect.value || 12); }

function setStatus(title, message = '') { elements.statusTitle.textContent = title; elements.statusText.textContent = message; }
function setProgress(progress, message) { const safe = Math.max(0, Math.min(1, Number(progress || 0))); elements.progressFill.style.width = `${safe * 100}%`; elements.progressPercent.textContent = `${Math.round(safe * 100)}%`; elements.progressLabel.textContent = message || 'جاهز'; }
function updateProjectStatusUi(statusText) { elements.projectSaveBtn.classList.toggle('is-dirty', state.project.isDirty && !state.project.isSaving); elements.projectSaveBtn.classList.toggle('is-saving', state.project.isSaving); elements.projectSaveBtn.disabled = state.project.isSaving; elements.projectSaveStatus.textContent = statusText || (state.project.isSaving ? 'جارٍ الحفظ...' : state.project.isDirty ? 'تغييرات غير محفوظة' : state.project.lastSavedAt ? 'تم الحفظ' : 'مشروع جديد'); }
function markProjectDirty() { if (isApplyingProjectData) return; projectChangeRevision++; state.project.isDirty = true; updateProjectStatusUi(); scheduleAutosave(); }
function scheduleAutosave() { clearTimeout(autosaveTimerId); if (!state.project.autosaveEnabled || !state.project.currentProjectPath || !state.project.isDirty) return; autosaveTimerId = setTimeout(() => saveCurrentProject({ autosave: true }), PROJECT_AUTOSAVE_DELAY_MS); }

function fillSelect(select, items, placeholder) { select.innerHTML = ''; const empty = document.createElement('option'); empty.value = ''; empty.textContent = placeholder; select.appendChild(empty); items.forEach((item) => { const opt = document.createElement('option'); opt.value = item.name; opt.textContent = item.name; select.appendChild(opt); }); }
function findMusicAsset() { return state.assets.music.find((item) => item.name === state.music || item.path === state.music) || null; }
function findEndPageAsset() { return state.assets.endpage.find((item) => item.name === state.endPage || item.path === state.endPage) || null; }
function assetUrl(item) { return item?.url || (item?.path ? toFileUrl(item.path) : null); }

async function readMediaDurationMs(fileUrl, fallbackMs = 0) { if (!fileUrl) return fallbackMs; return new Promise((resolve) => { const video = document.createElement('video'); let done = false; const finish = (value) => { if (done) return; done = true; video.remove(); resolve(value); }; const timeout = setTimeout(() => finish(fallbackMs), 5000); video.preload = 'metadata'; video.src = fileUrl; video.onloadedmetadata = () => { clearTimeout(timeout); finish(Number.isFinite(video.duration) && video.duration > 0 ? Math.round(video.duration * 1000) : fallbackMs); }; video.onerror = () => { clearTimeout(timeout); finish(fallbackMs); }; }); }

function buildProjectPayload() { return { projectType: PROJECT_TYPE, appVersion: state.appVersion, currentProjectPath: state.project.currentProjectPath, projectName: state.project.projectName, createdAt: state.project.createdAt, data: { slides: state.slides, music: state.music, voiceover: state.voiceover, voiceoverVolume: state.voiceoverVolume, voiceoverDurationMs: state.voiceoverDurationMs, endPage: state.endPage, endPageDurationFrames: state.endPageDurationFrames, slideDurationInSeconds: state.slideDurationInSeconds, content: state.content } }; }
function applyProjectMeta(project, filePath) { state.project.currentProjectPath = filePath || ''; state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.chp$/i, '') : 'Personalities Project'); state.project.createdAt = project?.createdAt || state.project.createdAt; state.project.lastSavedAt = project?.updatedAt || new Date().toISOString(); state.project.isDirty = false; }
async function saveCurrentProject({ forceSaveAs = false, autosave = false } = {}) { if (state.project.isSaving) return; clearTimeout(autosaveTimerId); state.project.isSaving = true; updateProjectStatusUi('جارٍ الحفظ...'); let failed = false; try { const rev = projectChangeRevision; const payload = buildProjectPayload(); const result = forceSaveAs ? await window.projectApi.saveProjectAs(payload) : await window.projectApi.saveProject(payload); if (!result?.success) throw new Error(result?.error || 'فشل الحفظ'); if (result.canceled) return; applyProjectMeta(result.project, result.filePath); if (projectChangeRevision !== rev) { state.project.isDirty = true; scheduleAutosave(); } updateProjectStatusUi('تم الحفظ'); } catch (error) { failed = true; if (!autosave) setStatus('خطأ', error.message || 'فشل حفظ المشروع'); updateProjectStatusUi('فشل الحفظ'); } finally { state.project.isSaving = false; updateProjectStatusUi(failed ? 'فشل الحفظ' : undefined); } }
async function openProject() { try { const result = await window.projectApi.openProject({ isDirty: state.project.isDirty, project: buildProjectPayload() }); if (!result?.success) throw new Error(result?.error || 'فشل فتح المشروع'); if (result.canceled) return; await applyOpenedProject(result.project, result.filePath); } catch (error) { setStatus('خطأ', error.message || 'تعذر فتح المشروع'); } }
async function applyOpenedProject(project, filePath) { const data = project?.data || {}; isApplyingProjectData = true; try { state.slides = Array.isArray(data.slides) ? data.slides : []; state.music = data.music || ''; state.voiceover = data.voiceover || null; state.voiceoverVolume = Number(data.voiceoverVolume || 100); state.voiceoverDurationMs = Number(data.voiceoverDurationMs || 0); state.endPage = data.endPage || 'endpage.mp4'; state.endPageDurationFrames = Number(data.endPageDurationFrames || 0); state.slideDurationInSeconds = Number(data.slideDurationInSeconds || 5); state.content = { ...state.content, ...(data.content || {}) }; applyProjectMeta(project, filePath); } finally { isApplyingProjectData = false; } syncUI(); renderPreviewFrame(); setStatus('تم الفتح', 'تم فتح مشروع شخصيات بنجاح'); }

function renderSlides() { elements.slidesList.innerHTML = ''; elements.slidesCount.textContent = `${state.slides.length} شريحة`; elements.emptyState.style.display = state.slides.length ? 'none' : 'flex'; state.slides.forEach((slide, index) => elements.slidesList.appendChild(createSlideCard(slide, index))); updateRuntimeSummary(); renderPreviewFrame(); }
function createSlideCard(slide, index) { const card = document.createElement('div'); card.className = `slide-card ${slide.id === state.selectedSlideId ? 'selected' : ''} ${slide.id === state.dragOverSlideId ? 'drag-over' : ''}`; card.dataset.slideId = slide.id; card.draggable = false; const mediaUrl = slide.fileUrl || toFileUrl(slide.imagePath); const isVideo = slide.mediaType === 'video' || isVideoPath(slide.imagePath); const trimStartSec = Number(slide.trimStartMs || 0) / 1000; const trimEndSec = slide.trimEndMs ? Number(slide.trimEndMs) / 1000 : ''; const imageDurationSec = (slide.durationMs > 0 ? Number(slide.durationMs) : DEFAULT_IMAGE_DURATION_MS) / 1000; const usedDurationMs = getSlideEffectiveDurationMs(slide); card.innerHTML = `
    <div><div class="slide-order">${String(index + 1).padStart(2, '0')}</div><div class="drag-handle" title="اسحب لإعادة الترتيب"><span></span><span></span><span></span></div></div>
    <div class="slide-thumb-wrap">${isVideo ? `<video class="slide-thumb" src="${mediaUrl}" muted></video>` : `<img class="slide-thumb" src="${mediaUrl}" alt="slide" />`}</div>
    <div class="slide-main"><div class="slide-title">${prettifyPath(slide.imagePath) || `شريحة ${index + 1}`}</div><div class="slide-meta"><span class="badge">${isVideo ? 'فيديو' : 'صورة'}</span>${isVideo ? `<span class="badge warn">قص اختياري</span>` : ''}</div>${isVideo ? `<div class="trim-row"><label>بداية<input class="number-input" type="number" min="0" step="0.1" data-trim="start" value="${trimStartSec.toFixed(1)}" /></label><label>نهاية<input class="number-input" type="number" min="0" step="0.1" data-trim="end" placeholder="كامل" value="${trimEndSec === '' ? '' : trimEndSec.toFixed(1)}" /></label></div><div class="muted-text">المدة المستخدمة: ${usedDurationMs > 0 ? formatDuration(usedDurationMs) : 'غير معروفة'}</div>` : `<div style="display:flex;align-items:center;gap:.5rem"><label class="muted-text" style="white-space:nowrap">مدة الصورة (ث):</label><input class="number-input slide-duration-input" type="number" min="1" step="1" value="${imageDurationSec}" style="width:70px;text-align:center" /></div>`}
    <div style="display:flex;flex-direction:column;gap:.35rem"><button class="btn-secondary" data-action="replace" title="استبدال"><i data-lucide="refresh-cw"></i></button><button class="btn-secondary btn-danger" data-action="delete" title="حذف"><i data-lucide="trash-2"></i></button></div>`;
  card.addEventListener('click', () => { state.selectedSlideId = slide.id; renderSlides(); });
  card.querySelector('[data-action="delete"]')?.addEventListener('click', (event) => { event.stopPropagation(); state.slides = state.slides.filter((s) => s.id !== slide.id); markProjectDirty(); renderSlides(); });
  card.querySelector('[data-action="replace"]')?.addEventListener('click', async (event) => { event.stopPropagation(); const picked = await window.desktopApi.pickSlides(); if (Array.isArray(picked) && picked[0]) { await applyPickedMediaToSlide(slide.id, picked[0]); } });
  card.querySelectorAll('[data-trim]').forEach((input) => { input.addEventListener('input', () => { const target = state.slides.find((s) => s.id === slide.id); if (!target) return; if (input.dataset.trim === 'start') target.trimStartMs = Math.max(0, Number(input.value || 0) * 1000); if (input.dataset.trim === 'end') target.trimEndMs = input.value === '' ? null : Math.max(0, Number(input.value || 0) * 1000); if (target.trimEndMs && target.trimEndMs <= (target.trimStartMs || 0)) { input.setCustomValidity('النهاية يجب أن تكون أكبر من البداية'); } else { input.setCustomValidity(''); } markProjectDirty(); renderSlides(); renderPreviewFrame(); }); });
  card.querySelectorAll('.slide-duration-input').forEach((input) => { input.addEventListener('input', () => { const target = state.slides.find((s) => s.id === slide.id); if (!target) return; const seconds = Math.max(1, Number(input.value || 8)); target.durationMs = seconds * 1000; markProjectDirty(); renderSlides(); renderPreviewFrame(); }); });
  const handle = card.querySelector('.drag-handle'); handle?.addEventListener('dragstart', (event) => { state.draggedSlideId = slide.id; state.dragOverSlideId = slide.id; if (event.dataTransfer) { event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', slide.id); } }); handle?.addEventListener('dragend', () => { state.draggedSlideId = null; state.dragOverSlideId = null; renderSlides(); }); handle.draggable = true;
  card.addEventListener('dragover', (event) => { if (!state.draggedSlideId || state.draggedSlideId === slide.id) return; event.preventDefault(); state.dragOverSlideId = slide.id; card.classList.add('drag-over'); }); card.addEventListener('drop', (event) => { event.preventDefault(); if (!state.draggedSlideId || state.draggedSlideId === slide.id) return; reorderSlides(state.draggedSlideId, slide.id); state.draggedSlideId = null; state.dragOverSlideId = null; markProjectDirty(); renderSlides(); });
  setTimeout(() => { if (window.lucide) window.lucide.createIcons({ nodes: [card] }); }, 0); return card; }
async function applyPickedMediaToSlide(slideId, media) { const target = state.slides.find((s) => s.id === slideId); if (!target) return; const mediaType = isVideoPath(media.imagePath) ? 'video' : 'image'; const fileUrl = media.fileUrl || toFileUrl(media.imagePath); if (mediaType === 'image') { const oldDuration = target.mediaType === 'image' ? (target.durationMs || DEFAULT_IMAGE_DURATION_MS) : DEFAULT_IMAGE_DURATION_MS; Object.assign(target, { imagePath: media.imagePath, fileUrl, mediaType, isMuted: true, trimStartMs: 0, trimEndMs: null, durationMs: oldDuration, mediaDurationMs: 0 }); } else { const mediaDurationMs = await readMediaDurationMs(fileUrl, 0); Object.assign(target, { imagePath: media.imagePath, fileUrl, mediaType, isMuted: true, trimStartMs: 0, trimEndMs: null, durationMs: mediaDurationMs, mediaDurationMs }); } markProjectDirty(); renderSlides(); }
function reorderSlides(sourceId, targetId) { const from = state.slides.findIndex((s) => s.id === sourceId); const to = state.slides.findIndex((s) => s.id === targetId); if (from < 0 || to < 0) return; const [item] = state.slides.splice(from, 1); state.slides.splice(to, 0, item); }
async function handlePickSlides() { const picked = await window.desktopApi.pickSlides(); if (!Array.isArray(picked) || picked.length === 0) return; const normalized = []; for (const item of picked) { const mediaType = isVideoPath(item.imagePath) ? 'video' : 'image'; const fileUrl = item.fileUrl || toFileUrl(item.imagePath); const mediaDurationMs = mediaType === 'video' ? await readMediaDurationMs(fileUrl, 0) : 0; normalized.push({ id: item.id || createId('slide'), imagePath: item.imagePath, fileUrl, mediaType, text: '', isMuted: true, trimStartMs: 0, trimEndMs: null, durationMs: mediaType === 'video' ? mediaDurationMs : DEFAULT_IMAGE_DURATION_MS, mediaDurationMs }); } state.slides.push(...normalized); markProjectDirty(); renderSlides(); }

function buildPreviewInputProps() { const musicAsset = findMusicAsset(); const endPageAsset = findEndPageAsset(); const audioMs = getMainVoiceoverDurationMs(); const slidesMs = getSlidesTimelineDurationMs(state.slides); return { projectType: 'personalities', renderMode: 'personalities', slides: state.slides.map((slide) => ({ id: slide.id, mediaUrl: slide.fileUrl || toFileUrl(slide.imagePath), imageUrl: slide.fileUrl || toFileUrl(slide.imagePath), mediaType: slide.mediaType || 'image', text: '', isMuted: slide.isMuted !== false, durationMs: slide.durationMs || DEFAULT_IMAGE_DURATION_MS, mediaDurationMs: slide.mediaDurationMs || 0, trimStartMs: Number(slide.trimStartMs || 0), trimEndMs: slide.trimEndMs || null })), overlay: null, music: assetUrl(musicAsset), mainVoiceover: state.voiceover ? toFileUrl(state.voiceover) : null, mainVoiceoverDurationMs: audioMs, voiceover: state.voiceover ? toFileUrl(state.voiceover) : null, voiceoverDurationMs: audioMs, musicVolume: Number(state.musicVolume || 50), voiceoverVolume: Number(state.voiceoverVolume || 100), endPage: assetUrl(endPageAsset), finalDurationMs: audioMs > 0 ? audioMs : slidesMs, timelineDurationMs: slidesMs, endPageDurationFrames: Number(state.endPageDurationFrames || 0), slideDurationInSeconds: Number(state.slideDurationInSeconds || 5), effects: [], textBottomOffset: 160, textFontSize: 46, textPreset: 'dark', textAnimationType: 'motion-blur', parallaxEnabled: false, cinematicBarSize: 0, textHorizontalOffset: 0 }; }
function getTotalDurationFrames() { const audioMs = getMainVoiceoverDurationMs(); if (audioMs > 0) { return Math.max(FPS, Math.round((audioMs / 1000) * FPS)); } const slidesMs = getSlidesTimelineDurationMs(state.slides); return Math.max(FPS, Math.round((slidesMs / 1000) * FPS) + Number(state.endPageDurationFrames || 0)); }
function previewApi() { return window.DesktopRemotionPreview || null; }
function renderPreviewFrame() { const api = previewApi(); if (!api || !elements.previewStage) return; const inputProps = buildPreviewInputProps(); const frames = getTotalDurationFrames(); api.mount(elements.previewStage); api.update({ inputProps, durationInFrames: frames }); }
function updateRuntimeSummary() { const audioMs = getMainVoiceoverDurationMs(); const slidesMs = getSlidesTimelineDurationMs(state.slides); const detailEl = elements.slidesTimelineSummary; const summaryEl = elements.runtimeSummary; let detailText = ''; let summaryText = `${state.slides.length} شريحة`; if (audioMs > 0) { const delta = slidesMs - audioMs; const absDelta = Math.abs(delta); if (absDelta <= TIMELINE_TOLERANCE_MS) { detailText = `مدة الصوت: ${formatDuration(audioMs)} | مدة الشرائح: ${formatDuration(slidesMs)} | المدة متطابقة تقريبًا`; } else if (delta >= 0) { detailText = `مدة الصوت: ${formatDuration(audioMs)} | مدة الشرائح: ${formatDuration(slidesMs)} | زائد عن الصوت: ${formatDuration(delta)} - سيتم إنهاء الفيديو عند نهاية الصوت`; } else { detailText = `مدة الصوت: ${formatDuration(audioMs)} | مدة الشرائح: ${formatDuration(slidesMs)} | المتبقي: ${formatDuration(absDelta)} - سيتم تمديد آخر شريحة حتى نهاية الصوت`; } summaryText += ` | ${formatDuration(audioMs)}`; } else { detailText = `مدة الصوت: غير محددة | مدة الشرائح: ${formatDuration(slidesMs)}`; summaryText += ` | ${formatDuration(slidesMs)}`; } if (detailEl) detailEl.textContent = detailText; if (summaryEl) summaryEl.textContent = summaryText; }

function renderAudioUi() { fillSelect(elements.musicSelect, state.assets.music || [], 'بدون موسيقى'); elements.musicSelect.value = state.music || ''; fillSelect(elements.endPageSelect, state.assets.endpage || [], 'بدون شاشة نهاية'); elements.endPageSelect.value = state.endPage || ''; elements.musicVolumeInput.value = String(state.musicVolume || 50); elements.musicVolumeValue.textContent = `${state.musicVolume || 50}%`; elements.voiceoverVolumeInput.value = String(state.voiceoverVolume || 100); elements.voiceoverVolumeValue.textContent = `${state.voiceoverVolume || 100}%`; elements.voiceoverFilename.textContent = state.voiceover ? prettifyPath(state.voiceover) : 'لم يتم اختيار ملف'; updateVoiceoverMeta(); }
function updateVoiceoverMeta() { elements.voiceoverMeta.textContent = state.voiceover ? `موجود${state.voiceoverDurationMs ? ` | ${formatDuration(state.voiceoverDurationMs)}` : ''}` : 'لا يوجد'; }
async function handlePickVoiceover() { const result = await window.desktopApi.pickVoiceover(); if (!result) return; const audioDurationMs = await readAudioDurationMs(result.url, 0); state.voiceover = result.path; state.voiceoverDurationMs = audioDurationMs; state.content.mainVoiceoverPath = result.path; state.content.mainVoiceoverUrl = result.url; state.content.mainVoiceoverDurationMs = audioDurationMs; markProjectDirty(); renderAudioUi(); renderSlides(); renderPreviewFrame(); }
function handleClearVoiceover() { state.voiceover = null; state.voiceoverDurationMs = 0; state.content.mainVoiceoverPath = ''; state.content.mainVoiceoverUrl = ''; state.content.mainVoiceoverDurationMs = 0; markProjectDirty(); renderAudioUi(); renderSlides(); renderPreviewFrame(); }
async function ensureEndPageDuration() { const asset = findEndPageAsset(); if (!asset || !asset.url) { state.endPageDurationFrames = 0; return; } if (state.endPageDurationFrames > 0) return; const ms = await readMediaDurationMs(asset.url, 0); state.endPageDurationFrames = ms > 0 ? Math.round((ms / 1000) * FPS) : 0; }

function populateVisualStyles() { const styles = presets.visualStyles || {}; elements.visualStyleSelect.innerHTML = ''; Object.entries(styles).forEach(([value, item]) => { const opt = document.createElement('option'); opt.value = value; opt.textContent = item.label; elements.visualStyleSelect.appendChild(opt); }); }
function syncContentInputs() { elements.mainScriptInput.value = state.content.mainScript || ''; elements.sceneCountSelect.value = String(state.content.sceneCount || 12); elements.customSceneCountInput.value = String(state.content.customSceneCount || state.content.sceneCount || 12); elements.customSceneCountWrap.classList.add('ui-hidden'); elements.visualStyleSelect.value = state.content.visualStyle || 'egyptianDocumentary'; elements.voiceDialectSelect.value = state.content.voiceDialect || 'msa'; elements.diacriticsCheckbox.checked = state.content.diacritics === true; elements.characterReferenceInput.value = state.content.characterReference || presets.defaults?.characterReference || ''; elements.globalRulesInput.value = state.content.globalRules || presets.defaults?.globalRules || ''; elements.prisonRulesInput.value = state.content.prisonRules || presets.defaults?.prisonRules || ''; elements.timeRulesInput.value = state.content.timeRules || presets.defaults?.timeRules || ''; updateScriptStats(); renderScenes(); }
function collectContentInputs() { state.content.mainScript = elements.mainScriptInput.value; const count = getSelectedSceneCount(); state.content.sceneCount = count; state.content.customSceneCount = Number(elements.customSceneCountInput.value || count); state.content.visualStyle = elements.visualStyleSelect.value || 'egyptianDocumentary'; state.content.voiceDialect = elements.voiceDialectSelect.value || 'msa'; state.content.diacritics = elements.diacriticsCheckbox.checked; state.content.characterReference = elements.characterReferenceInput.value; state.content.globalRules = elements.globalRulesInput.value; state.content.prisonRules = elements.prisonRulesInput.value; state.content.timeRules = elements.timeRulesInput.value; updateScriptStats(); }
function updateScriptStats() { const text = elements.mainScriptInput.value || ''; const words = text.trim() ? text.trim().split(/\s+/).length : 0; const estimatedSec = Math.round(words / 2.35); elements.scriptStats.textContent = words ? `عدد الكلمات: ${words} | مدة تقديرية: ${formatDuration(estimatedSec * 1000)}` : 'الصوت الكامل عادة بين دقيقتين و4 دقائق حسب طول النص.'; }
function renderScenes() { elements.scenesList.innerHTML = ''; const scenes = state.content.scenes || []; elements.scenesSummary.textContent = scenes.length ? `${scenes.length} مشهد` : 'لا توجد مشاهد بعد'; if (!scenes.length) { const empty = document.createElement('div'); empty.className = 'empty-state'; empty.innerHTML = '<strong>لم يتم توليد مشاهد بعد</strong><span>ألصق النص واضغط تقسيم المشاهد</span>'; elements.scenesList.appendChild(empty); return; } scenes.forEach((scene, index) => { const card = document.createElement('div'); card.className = 'scene-card'; const num = String(scene.sceneNumber || index + 1).padStart(2, '0'); card.innerHTML = `<div class="scene-row"><div><div class="scene-title">المشهد ${num} — ${escapeHtml(scene.title || 'بدون عنوان')}</div><div class="muted-text">${escapeHtml(scene.timePeriod || '')}${scene.location ? ' | ' + escapeHtml(scene.location) : ''}</div></div><div class="scene-actions"><button class="btn-secondary ${scene.copiedImagePrompt ? 'is-success' : ''}" data-action="copy-image">${scene.copiedImagePrompt ? '✓ ' : ''}برومبت الصورة</button><button class="btn-secondary ${scene.copiedMotionPrompt ? 'is-success' : ''}" data-action="copy-motion">${scene.copiedMotionPrompt ? '✓ ' : ''}برومبت الحركة</button><button class="btn-secondary" data-action="regen" title="إعادة توليد">↻</button><button class="btn-secondary" data-action="details">تفاصيل</button></div></div><div class="scene-details"><div class="muted-text"><strong>المقتطف:</strong> ${escapeHtml(scene.sourceExcerpt || '')}</div><div class="muted-text"><strong>الصوت:</strong> ${escapeHtml(scene.voiceoverText || '')}</div></div>`; card.querySelector('[data-action="details"]').addEventListener('click', () => card.classList.toggle('is-open')); card.querySelector('[data-action="copy-image"]').addEventListener('click', () => copyScenePrompt(index, 'image')); card.querySelector('[data-action="copy-motion"]').addEventListener('click', () => copyScenePrompt(index, 'motion')); card.querySelector('[data-action="regen"]').addEventListener('click', () => regenerateScene(index)); elements.scenesList.appendChild(card); }); }
function ensurePromptPrefix(scene, type) { const num = String(scene.sceneNumber || 1).padStart(2, '0'); const prefix = type === 'image' ? `Scene ${num} — Image Prompt:` : `Scene ${num} — Motion Prompt:`; const value = type === 'image' ? scene.imagePrompt : scene.motionPrompt; if (!value) return prefix; return value.trim().startsWith(prefix) ? value.trim() : `${prefix}\n${value.trim()}`; }
async function copyScenePrompt(index, type) { const scene = state.content.scenes[index]; if (!scene) return; const text = ensurePromptPrefix(scene, type); await navigator.clipboard.writeText(text); if (type === 'image') scene.copiedImagePrompt = true; else scene.copiedMotionPrompt = true; renderScenes(); }
async function regenerateScene(index) { const scene = state.content.scenes[index]; if (!scene) return; collectContentInputs(); elements.contentStatus.textContent = `إعادة توليد المشهد ${scene.sceneNumber || index + 1}...`; try { const payload = buildSceneGenerationPayload({ singleScene: scene }); const result = await window.desktopApi.generatePersonalityScenes(payload); if (!result?.success) throw new Error(result?.error || 'فشل إعادة التوليد'); const next = result.scenes?.[0]; if (next) { state.content.scenes[index] = { ...scene, ...normalizeScene(next, index), copiedImagePrompt: false, copiedMotionPrompt: false }; markProjectDirty(); renderScenes(); } elements.contentStatus.textContent = 'تمت إعادة التوليد'; } catch (error) { elements.contentStatus.textContent = error.message || 'فشلت إعادة التوليد'; } }
function buildSceneGenerationPayload(extra = {}) { const style = presets.visualStyles?.[state.content.visualStyle] || presets.visualStyles?.egyptianDocumentary || {}; return { script: state.content.mainScript, sceneCount: state.content.sceneCount, visualStyleKey: state.content.visualStyle, visualStyleLabel: style.label, visualStyleInjection: style.injection, voiceDialect: state.content.voiceDialect, diacritics: state.content.diacritics, characterReference: state.content.characterReference, globalRules: state.content.globalRules, prisonRules: state.content.prisonRules, timeRules: state.content.timeRules, imageTemplate: window.PersonalityPromptTemplates?.image || '', motionTemplate: window.PersonalityPromptTemplates?.motion || '', apiKey: state.settings.geminiApiKey || '', model: state.settings.contentModel || DEFAULT_SETTINGS.contentModel, ...extra }; }
function normalizeScene(scene, index) { const number = Number(scene.sceneNumber || index + 1); const base = { id: scene.id || createId('scene'), sceneNumber: number, title: scene.title || `مشهد ${number}`, sourceExcerpt: scene.sourceExcerpt || '', voiceoverText: scene.voiceoverText || '', imagePrompt: scene.imagePrompt || '', motionPrompt: scene.motionPrompt || '', timePeriod: scene.timePeriod || '', location: scene.location || '', copiedImagePrompt: false, copiedMotionPrompt: false }; base.imagePrompt = ensurePromptPrefix(base, 'image'); base.motionPrompt = ensurePromptPrefix(base, 'motion'); return base; }
async function handleGenerateScenes() { collectContentInputs(); if (!state.content.mainScript.trim()) { elements.contentStatus.textContent = 'أدخل النص الرئيسي أولًا'; return; } elements.generateScenesBtn.disabled = true; elements.contentStatus.textContent = 'جاري تقسيم المشاهد...'; try { const result = await window.desktopApi.generatePersonalityScenes(buildSceneGenerationPayload()); if (!result?.success) throw new Error(result?.error || 'فشل تقسيم المشاهد'); state.content.scenes = (result.scenes || []).map(normalizeScene); markProjectDirty(); renderScenes(); elements.contentStatus.textContent = 'تم توليد المشاهد'; } catch (error) { elements.contentStatus.textContent = error.message || 'حدث خطأ'; } finally { elements.generateScenesBtn.disabled = false; } }
async function handleGenerateMainVoiceover() { collectContentInputs(); const text = state.content.mainScript.trim(); if (!text) { elements.mainVoiceoverStatus.textContent = 'أدخل النص الرئيسي أولًا'; return; } elements.generateMainVoiceoverBtn.disabled = true; elements.mainVoiceoverStatus.textContent = 'جاري توليد صوت النص الكامل...'; try { const stylePrompt = state.content.voiceDialect === 'egyptian' ? 'Warm Egyptian Arabic documentary narrator. Speak naturally in Egyptian Arabic with calm emotional delivery and clear articulation.' : (state.settings.ttsStylePrompt || DEFAULT_SETTINGS.ttsStylePrompt); const result = await window.desktopApi.generateSingleVoiceover({ text, voiceName: state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice, ttsModel: state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel, apiKey: state.settings.geminiApiKey || '', stylePrompt }); if (!result?.success) throw new Error(result?.error || 'فشل توليد الصوت'); state.voiceover = result.voiceoverPath; state.voiceoverDurationMs = result.durationMs || 0; state.content.mainVoiceoverPath = result.voiceoverPath; state.content.mainVoiceoverUrl = result.voiceoverUrl; state.content.mainVoiceoverDurationMs = result.durationMs || 0; markProjectDirty(); renderAudioUi(); renderPreviewFrame(); elements.mainVoiceoverStatus.textContent = `✓ تم توليد الصوت: ${formatDuration(result.durationMs || 0)}`; } catch (error) { elements.mainVoiceoverStatus.textContent = `✗ ${error.message || 'فشل توليد الصوت'}`; } finally { elements.generateMainVoiceoverBtn.disabled = false; } }

function buildRenderPayload() { const musicAsset = findMusicAsset(); const endPageAsset = findEndPageAsset(); const audioMs = getMainVoiceoverDurationMs(); const slidesMs = getSlidesTimelineDurationMs(state.slides); const finalMs = audioMs > 0 ? audioMs : slidesMs; return { model: 'personalities', projectType: 'personalities', renderMode: 'personalities', slides: state.slides.map((slide) => ({ id: slide.id, imagePath: slide.imagePath, mediaPath: slide.imagePath, mediaType: slide.mediaType || 'image', text: '', isMuted: slide.isMuted !== false, durationMs: slide.durationMs || DEFAULT_IMAGE_DURATION_MS, mediaDurationMs: slide.mediaDurationMs || 0, trimStartMs: Number(slide.trimStartMs || 0), trimEndMs: slide.trimEndMs || null })), music: musicAsset ? musicAsset.path : null, voiceover: state.voiceover || null, mainVoiceoverPath: state.voiceover || null, mainVoiceoverDurationMs: audioMs, voiceoverDurationMs: audioMs, musicVolume: Number(state.musicVolume || 50), voiceoverVolume: Number(state.voiceoverVolume || 100), endPage: endPageAsset ? endPageAsset.path : null, endPageDurationFrames: Number(state.endPageDurationFrames || 0), finalDurationMs: finalMs, timelineDurationMs: slidesMs, turboMode: document.getElementById('turbo-render-checkbox')?.checked || false }; }
async function handleRender() { if (state.isRendering) return; const validation = validateTimelineBeforeRender(); if (!validation.allowed) { setStatus('فشل الرندر', validation.message); return; } state.isRendering = true; elements.renderBtn.disabled = true; elements.renderBtn.style.display = 'none'; elements.cancelRenderBtn.style.display = 'inline-flex'; elements.renderResult.innerHTML = ''; setStatus('جاري الرندر', 'يتم الآن تجهيز فيديو الشخصيات.'); setProgress(.02, 'بدء مهمة الرندر...'); if (validation.level === 'warning') { elements.renderResult.innerHTML = `<div class="muted-text" style="color:var(--warn);margin-bottom:.5rem">${validation.message}</div>`; } else if (validation.level === 'info' && validation.message) { elements.renderResult.innerHTML = `<div class="muted-text" style="color:var(--text-mu);margin-bottom:.5rem">${validation.message}</div>`; } try { await ensureEndPageDuration(); const result = await window.desktopApi.render(buildRenderPayload()); setStatus('اكتمل الرندر', 'تم حفظ الفيديو بنجاح.'); setProgress(1, 'اكتمل الرندر'); elements.renderResult.innerHTML = `<strong>تم حفظ الفيديو</strong><br><span>${escapeHtml(result.outputPath)}</span><div class="render-actions" style="margin-top:.5rem"><button id="reveal-file-btn" class="btn-secondary">إظهار الملف</button><button id="open-folder-btn" class="btn-secondary">فتح المجلد</button></div>`; $('reveal-file-btn')?.addEventListener('click', () => window.desktopApi.revealInFolder(result.outputPath)); $('open-folder-btn')?.addEventListener('click', () => window.desktopApi.openOutputFolder()); } catch (error) { setStatus('فشل الرندر', error.message || 'حدث خطأ أثناء الرندر.'); setProgress(0, 'فشل الرندر'); } finally { state.isRendering = false; elements.renderBtn.disabled = false; elements.renderBtn.style.display = 'inline-flex'; elements.cancelRenderBtn.style.display = 'none'; } }

function syncUI() { renderAudioUi(); syncContentInputs(); renderSlides(); updateProjectStatusUi(); }
async function bootstrap() { try { const data = await window.desktopApi.bootstrap(); state.appVersion = data.appVersion || state.appVersion; state.assets = data.assets || state.assets; state.placeholderPath = data.placeholderPath || null; if (data.logoDataUrl) elements.brandLogo.src = data.logoDataUrl; } catch (error) { console.warn(error); } try { const settings = await window.desktopApi.getSettings(); state.settings = { ...DEFAULT_SETTINGS, ...(settings || {}) }; } catch {} populateVisualStyles(); syncUI(); if (window.lucide) window.lucide.createIcons(); renderPreviewFrame(); setStatus('جاهز', 'أضف الشرائح أو ابدأ من تبويب محتوى'); }

function attachEvents() { document.querySelectorAll('.tab-btn').forEach((btn) => { btn.addEventListener('click', () => { document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active')); document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active')); btn.classList.add('active'); $(btn.dataset.target)?.classList.add('active'); renderPreviewFrame(); }); }); elements.pickSlidesBtn.addEventListener('click', handlePickSlides); elements.emptyState.addEventListener('click', handlePickSlides); elements.projectSaveBtn.addEventListener('click', () => saveCurrentProject()); elements.projectOpenBtn.addEventListener('click', openProject); elements.musicSelect.addEventListener('change', () => { state.music = elements.musicSelect.value; markProjectDirty(); renderPreviewFrame(); }); elements.musicVolumeInput.addEventListener('input', () => { state.musicVolume = Number(elements.musicVolumeInput.value); elements.musicVolumeValue.textContent = `${state.musicVolume}%`; markProjectDirty(); renderPreviewFrame(); }); elements.voiceoverVolumeInput.addEventListener('input', () => { state.voiceoverVolume = Number(elements.voiceoverVolumeInput.value); elements.voiceoverVolumeValue.textContent = `${state.voiceoverVolume}%`; markProjectDirty(); renderPreviewFrame(); }); elements.endPageSelect.addEventListener('change', () => { state.endPage = elements.endPageSelect.value; state.endPageDurationFrames = 0; markProjectDirty(); renderPreviewFrame(); }); elements.pickVoiceoverBtn.addEventListener('click', handlePickVoiceover); elements.clearVoiceoverBtn.addEventListener('click', handleClearVoiceover); elements.openOutputBtn.addEventListener('click', () => window.desktopApi.openOutputFolder()); elements.renderBtn.addEventListener('click', handleRender); elements.cancelRenderBtn.addEventListener('click', () => window.desktopApi.cancelRender({ model: 'personalities' })); [elements.mainScriptInput, elements.characterReferenceInput, elements.globalRulesInput, elements.prisonRulesInput, elements.timeRulesInput].forEach((el) => el.addEventListener('input', () => { collectContentInputs(); markProjectDirty(); })); elements.sceneCountSelect.addEventListener('change', () => { elements.customSceneCountWrap.classList.toggle('ui-hidden', elements.sceneCountSelect.value !== 'custom'); collectContentInputs(); markProjectDirty(); }); [elements.customSceneCountInput, elements.visualStyleSelect, elements.voiceDialectSelect, elements.diacriticsCheckbox].forEach((el) => el.addEventListener('change', () => { collectContentInputs(); markProjectDirty(); })); elements.generateScenesBtn.addEventListener('click', handleGenerateScenes); elements.generateMainVoiceoverBtn.addEventListener('click', handleGenerateMainVoiceover); elements.previewPlayBtn.addEventListener('click', () => { const api = previewApi(); if (!api) return; state.previewPlaying = !state.previewPlaying; state.previewPlaying ? api.play() : api.pause(); }); elements.previewRestartBtn.addEventListener('click', () => previewApi()?.seekTo(0)); elements.previewMuteBtn.addEventListener('click', () => { state.previewMuted = !state.previewMuted; }); elements.previewFullscreenBtn.addEventListener('click', () => elements.previewStageShell.requestFullscreen?.()); window.desktopApi.onRenderProgress((payload) => { if (!payload) return; setProgress(payload.progress || 0, payload.message || payload.stage || 'جاري الرندر'); }); }

attachEvents();
bootstrap();
