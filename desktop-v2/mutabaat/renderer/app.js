const FPS = 25;
const PROJECT_TYPE = 'mutabaat';
const PROJECT_AUTOSAVE_DELAY_MS = 1600;
const DEFAULT_SLIDE_MS = 15000;
const FINAL_SLIDE_MS = 20000;

const state = {
  appVersion: '1.0.0',
  slides: [],
  selectedSlideId: null,
  draggedSlideId: null,
  dragOverSlideId: null,
  textBottomOffset: 130,
  textFontSize: 54,
  bgMusicVolume: 35,
  assetsDir: '',
  isRendering: false,
  previewPlaying: false,
  previewMuted: false,
  previewPositionMs: 0,
  previewRafId: null,
  previewStartedAt: 0,
  project: {
    currentProjectPath: '',
    projectName: 'متابعات Project',
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    autosaveEnabled: true,
    createdAt: null,
  },
};

const elements = {
  brandLogo: document.getElementById('brand-logo'),
  projectSaveBtn: document.getElementById('project-save-btn'),
  projectOpenBtn: document.getElementById('project-open-btn'),
  projectSaveStatus: document.getElementById('project-save-status'),
  slidesCount: document.getElementById('slides-count'),
  runtimeSummary: document.getElementById('runtime-summary'),
  pickSlidesBtn: document.getElementById('pick-slides-btn'),
  slidesList: document.getElementById('slides-list'),
  emptyState: document.getElementById('empty-state'),
  previewStage: document.getElementById('preview-stage'),
  previewExactRoot: document.getElementById('preview-exact-root'),
  previewPlayBtn: document.getElementById('preview-play-btn'),
  previewMuteBtn: document.getElementById('preview-mute-btn'),
  previewRestartBtn: document.getElementById('preview-restart-btn'),
  previewFullscreenBtn: document.getElementById('preview-fullscreen-btn'),
  previewSeek: document.getElementById('preview-seek'),
  previewTimeInline: document.getElementById('preview-time-inline'),
  statusTitle: document.getElementById('status-title'),
  statusText: document.getElementById('status-text'),
  progressFill: document.getElementById('progress-fill'),
  progressLabel: document.getElementById('progress-label'),
  progressPercent: document.getElementById('progress-percent'),
  renderBtn: document.getElementById('render-btn'),
  cancelRenderBtn: document.getElementById('cancel-render-btn'),
  openOutputBtn: document.getElementById('open-output-btn'),
  renderResult: document.getElementById('render-result'),
  turboRenderCheckbox: document.getElementById('turbo-render-checkbox'),
};

let autosaveTimerId = null;
let previewRenderTimerId = null;
let isApplyingProjectData = false;
let projectChangeRevision = 0;

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function prettifyPath(fullPath) {
  if (!fullPath) return '';
  const parts = fullPath.split(/[/\\]/);
  return parts[parts.length - 1];
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function formatSeconds(ms) {
  return `${Math.round(ms / 1000)}ث`;
}

function getSlideDurationMs(index) {
  return index === state.slides.length - 1 ? FINAL_SLIDE_MS : DEFAULT_SLIDE_MS;
}

function getTotalDurationMs() {
  return state.slides.reduce((sum, _slide, index) => sum + getSlideDurationMs(index), 0);
}

function selectedSlide() {
  return state.slides.find((slide) => slide.id === state.selectedSlideId) || null;
}

function syncSelectedSlide() {
  if (state.slides.length === 0) {
    state.selectedSlideId = null;
    return;
  }

  if (!state.slides.some((slide) => slide.id === state.selectedSlideId)) {
    state.selectedSlideId = state.slides[0].id;
  }
}

function clearDragState() {
  state.draggedSlideId = null;
  state.dragOverSlideId = null;
}

function updateDragOverClasses() {
  Array.from(elements.slidesList.querySelectorAll('.slide-card')).forEach((card) => {
    card.classList.toggle('drag-over', card.dataset.slideId === state.dragOverSlideId);
  });
}

function previewApi() {
  return window.DesktopRemotionPreviewMutabaat || null;
}

function getFileUrl(slide) {
  return slide.fileUrl || (slide.imagePath && window.desktopApi?.toFileUrl ? window.desktopApi.toFileUrl(slide.imagePath) : '');
}

function getMutabaatAssetUrl(fileName) {
  if (!state.assetsDir || !window.desktopApi?.toFileUrl) return null;
  const cleanBase = state.assetsDir.replace(/[\\/]+$/, '');
  const separator = cleanBase.includes('\\') ? '\\' : '/';
  return window.desktopApi.toFileUrl(`${cleanBase}${separator}mutabaat${separator}${fileName}`);
}

function buildInputProps() {
  return {
    slides: state.slides.map((slide, index) => ({
      id: slide.id,
      imageUrl: getFileUrl(slide),
      text: slide.text || '',
      durationMs: getSlideDurationMs(index),
    })),
    overlayUrl: getMutabaatAssetUrl('slide.webm'),
    finalOverlayUrl: getMutabaatAssetUrl('final-slide.webm'),
    bgMusicUrl: getMutabaatAssetUrl('news-clock-intense-loop.wav'),
    bgMusicVolume: Number(state.bgMusicVolume || 0) / 100,
    textBottomOffset: Number(state.textBottomOffset || 130),
    textFontSize: Number(state.textFontSize || 54),
  };
}

function getTotalPreviewDurationFrames() {
  return Math.max(FPS, Math.round((getTotalDurationMs() / 1000) * FPS));
}

async function renderPreview() {
  const api = previewApi();
  if (!api || !elements.previewExactRoot) return;
  api.update({
    inputProps: buildInputProps(),
    durationInFrames: getTotalPreviewDurationFrames(),
    muted: state.previewMuted,
  });
  updatePreviewChrome();
}

function schedulePreviewRender(delayMs = 60) {
  window.clearTimeout(previewRenderTimerId);
  previewRenderTimerId = window.setTimeout(() => {
    renderPreview().catch((error) => console.error(error));
  }, delayMs);
}

function setStatus(title, text) {
  elements.statusTitle.textContent = title;
  elements.statusText.textContent = text || '';
}

function setProgress(progress, message) {
  const safeProgress = Math.max(0, Math.min(1, progress || 0));
  elements.progressFill.style.width = `${safeProgress * 100}%`;
  elements.progressPercent.textContent = `${Math.round(safeProgress * 100)}%`;
  elements.progressLabel.textContent = message || 'جاهز';
}

function updateProjectStatusUi(statusText) {
  if (!elements.projectSaveBtn || !elements.projectSaveStatus) return;
  elements.projectSaveBtn.classList.toggle('is-dirty', state.project.isDirty && !state.project.isSaving);
  elements.projectSaveBtn.classList.toggle('is-saving', state.project.isSaving);
  elements.projectSaveBtn.disabled = state.project.isSaving;

  if (statusText) {
    elements.projectSaveStatus.textContent = statusText;
    return;
  }
  if (state.project.isSaving) elements.projectSaveStatus.textContent = 'جارٍ الحفظ...';
  else if (state.project.isDirty) elements.projectSaveStatus.textContent = 'تغييرات غير محفوظة';
  else if (state.project.lastSavedAt) elements.projectSaveStatus.textContent = 'تم الحفظ';
  else elements.projectSaveStatus.textContent = 'مشروع جديد';
}

function scheduleAutosave() {
  window.clearTimeout(autosaveTimerId);
  if (!state.project.autosaveEnabled || !state.project.currentProjectPath || !state.project.isDirty) return;
  autosaveTimerId = window.setTimeout(() => saveCurrentProject({ autosave: true }), PROJECT_AUTOSAVE_DELAY_MS);
}

function markProjectDirty() {
  if (isApplyingProjectData) return;
  projectChangeRevision += 1;
  state.project.isDirty = true;
  updateProjectStatusUi();
  scheduleAutosave();
}

function updateRuntimeSummary() {
  const totalMs = getTotalDurationMs();
  elements.slidesCount.textContent = String(state.slides.length);
  elements.runtimeSummary.textContent = state.slides.length
    ? `${state.slides.length} شرائح | المدة ${formatSeconds(totalMs)} | كل شريحة 15ث والأخيرة 20ث`
    : 'كل شريحة 15 ثانية، والأخيرة 20 ثانية.';
}

function moveSlide(fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= state.slides.length ||
    toIndex >= state.slides.length
  ) {
    return;
  }

  const nextSlides = [...state.slides];
  const [movedSlide] = nextSlides.splice(fromIndex, 1);
  nextSlides.splice(toIndex, 0, movedSlide);
  state.slides = nextSlides;
  markProjectDirty();
}

function reorderSlidesById(draggedSlideId, targetSlideId) {
  if (!draggedSlideId || !targetSlideId || draggedSlideId === targetSlideId) {
    return;
  }

  const fromIndex = state.slides.findIndex((slide) => slide.id === draggedSlideId);
  const toIndex = state.slides.findIndex((slide) => slide.id === targetSlideId);
  moveSlide(fromIndex, toIndex);
}

function selectSlide(slideId) {
  state.selectedSlideId = slideId;
  const slideIndex = state.slides.findIndex((slide) => slide.id === slideId);
  if (slideIndex >= 0) {
    renderSlides();
    seekPreview(state.slides.slice(0, slideIndex).reduce((sum, _item, i) => sum + getSlideDurationMs(i), 0));
    return;
  }

  renderSlides();
}

function buildSlideCard(slide, index) {
  const wrapper = document.createElement('article');
  wrapper.className = 'slide-card';
  wrapper.dataset.slideId = slide.id;
  if (slide.id === state.selectedSlideId) {
    wrapper.classList.add('selected');
  }
  if (slide.id === state.dragOverSlideId) {
    wrapper.classList.add('drag-over');
  }

  wrapper.addEventListener('click', (event) => {
    if (event.target.closest('input,textarea,button,.drag-handle')) return;
    selectSlide(slide.id);
  });

  wrapper.addEventListener('dragover', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  wrapper.addEventListener('dragenter', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    if (state.dragOverSlideId !== slide.id) {
      state.dragOverSlideId = slide.id;
      updateDragOverClasses();
    }
  });

  wrapper.addEventListener('drop', (event) => {
    if (!state.draggedSlideId || state.draggedSlideId === slide.id) {
      return;
    }
    event.preventDefault();
    reorderSlidesById(state.draggedSlideId, slide.id);
    clearDragState();
    renderSlides();
    schedulePreviewRender();
  });

  const dragHandle = document.createElement('div');
  dragHandle.className = 'drag-handle';
  dragHandle.draggable = true;
  dragHandle.title = 'اسحب لإعادة ترتيب الشريحة';
  dragHandle.innerHTML = '<span></span><span></span><span></span>';
  dragHandle.addEventListener('dragstart', (event) => {
    state.draggedSlideId = slide.id;
    state.dragOverSlideId = slide.id;
    updateDragOverClasses();
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', slide.id);
    }
  });
  dragHandle.addEventListener('dragend', () => {
    window.setTimeout(() => {
      clearDragState();
      updateDragOverClasses();
    }, 0);
  });

  const sideMeta = document.createElement('div');
  sideMeta.className = 'slide-side-meta';
  const order = document.createElement('div');
  order.className = 'slide-order';
  order.textContent = String(index + 1);
  sideMeta.appendChild(dragHandle);
  sideMeta.appendChild(order);

  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'slide-thumb-wrap';
  const thumb = document.createElement('img');
  thumb.className = 'slide-thumb';
  thumb.src = getFileUrl(slide);
  thumb.alt = `Slide ${index + 1}`;
  thumbWrap.appendChild(thumb);

  const main = document.createElement('div');
  main.className = 'slide-main';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'slide-input';
  textInput.placeholder = 'اكتب النص الذي سيظهر على هذه الشريحة';
  textInput.value = slide.text || '';
  textInput.addEventListener('focus', () => {
    state.selectedSlideId = slide.id;
  });
  textInput.addEventListener('input', (event) => {
    updateSlideText(slide.id, event.target.value, { rerender: false });
  });
  main.appendChild(textInput);

  const durationBadge = document.createElement('div');
  durationBadge.className = 'slide-voiceover-badge';
  durationBadge.textContent = `مدة الشريحة: ${formatSeconds(getSlideDurationMs(index))}`;
  durationBadge.style.color = index === state.slides.length - 1 ? '#b45309' : '#2f815b';
  main.appendChild(durationBadge);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'slide-delete-btn';
  deleteBtn.title = 'حذف الشريحة';
  deleteBtn.setAttribute('aria-label', 'حذف الشريحة');
  deleteBtn.innerHTML = '<span aria-hidden="true">🗑</span>';
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteSlide(slide.id);
  });

  wrapper.appendChild(sideMeta);
  wrapper.appendChild(thumbWrap);
  wrapper.appendChild(main);
  wrapper.appendChild(deleteBtn);

  return wrapper;
}

function renderSlides() {
  syncSelectedSlide();
  const emptyEl = elements.emptyState;
  elements.slidesList.innerHTML = '';
  elements.slidesList.appendChild(emptyEl);
  emptyEl.style.display = state.slides.length === 0 ? 'flex' : 'none';
  state.slides.forEach((slide, index) => {
    elements.slidesList.appendChild(buildSlideCard(slide, index));
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  updateRuntimeSummary();
  syncSelectedSlidePanel();
  updatePreviewChrome();
}

function syncSelectedSlidePanel() {
  syncSelectedSlide();
}

function syncUI() {
  renderSlides();
  updateProjectStatusUi();
}

async function handlePickSlides() {
  const picked = await window.desktopApi.pickSlides();
  if (!Array.isArray(picked) || picked.length === 0) return;
  const imageSlides = picked
    .filter((item) => /\.(png|jpe?g|webp)$/i.test(item.imagePath || ''))
    .map((item) => ({
      id: item.id || createId('slide'),
      imagePath: item.imagePath,
      fileUrl: item.fileUrl,
      text: '',
    }));
  if (imageSlides.length === 0) return;

  state.slides = [...state.slides, ...imageSlides];
  state.selectedSlideId = state.selectedSlideId || imageSlides[0].id;
  markProjectDirty();
  syncUI();
  await renderPreview();
}

function deleteSlide(slideId) {
  const index = state.slides.findIndex((slide) => slide.id === slideId);
  state.slides = state.slides.filter((slide) => slide.id !== slideId);
  if (state.selectedSlideId === slideId) {
    state.selectedSlideId = state.slides[Math.max(0, index - 1)]?.id || state.slides[0]?.id || null;
  }
  markProjectDirty();
  syncUI();
  schedulePreviewRender();
}

function updateSlideText(slideId, value, { rerender = true } = {}) {
  const slide = state.slides.find((item) => item.id === slideId);
  if (!slide) return;
  slide.text = value;
  markProjectDirty();
  schedulePreviewRender();
  if (rerender) {
    renderSlides();
  }
}

function buildProjectData() {
  return {
    slides: state.slides.map((slide) => ({ ...slide })),
    selectedSlideId: state.selectedSlideId,
    textBottomOffset: state.textBottomOffset,
    textFontSize: state.textFontSize,
    bgMusicVolume: state.bgMusicVolume,
    render: {
      turboMode: elements.turboRenderCheckbox?.checked !== false,
    },
  };
}

function buildProjectPayload() {
  return {
    projectType: PROJECT_TYPE,
    appVersion: state.appVersion,
    currentProjectPath: state.project.currentProjectPath,
    projectName: state.project.projectName,
    createdAt: state.project.createdAt,
    data: buildProjectData(),
  };
}

function applyProjectMeta(project, filePath) {
  state.project.currentProjectPath = filePath || '';
  state.project.projectName = project?.projectName || (filePath ? prettifyPath(filePath).replace(/\.mtb$/i, '') : 'متابعات Project');
  state.project.createdAt = project?.createdAt || state.project.createdAt;
  state.project.lastSavedAt = project?.updatedAt || new Date().toISOString();
  state.project.isDirty = false;
}

async function saveCurrentProject({ forceSaveAs = false, autosave = false } = {}) {
  if (state.project.isSaving) return;
  window.clearTimeout(autosaveTimerId);
  state.project.isSaving = true;
  updateProjectStatusUi('جارٍ الحفظ...');
  let failed = false;
  try {
    const savingRevision = projectChangeRevision;
    const payload = buildProjectPayload();
    const result = forceSaveAs
      ? await window.projectApi.saveProjectAs(payload)
      : await window.projectApi.saveProject(payload);
    if (!result?.success) throw new Error(result?.error || 'فشل الحفظ');
    if (result.canceled) return;
    applyProjectMeta(result.project, result.filePath);
    if (projectChangeRevision !== savingRevision) {
      state.project.isDirty = true;
      scheduleAutosave();
    }
    updateProjectStatusUi('تم الحفظ');
  } catch (error) {
    failed = true;
    if (!autosave) setStatus('خطأ', error?.message || 'فشل حفظ المشروع');
    updateProjectStatusUi('فشل الحفظ');
  } finally {
    state.project.isSaving = false;
    updateProjectStatusUi(failed ? 'فشل الحفظ' : undefined);
  }
}

async function openProjectFromDisk() {
  const result = await window.projectApi.openProject({
    isDirty: state.project.isDirty,
    project: buildProjectPayload(),
  });
  if (!result?.success) {
    setStatus('خطأ', result?.error || 'تعذر فتح المشروع');
    return;
  }
  if (result.canceled) return;

  const data = result.project?.data || {};
  isApplyingProjectData = true;
  try {
    state.slides = Array.isArray(data.slides) ? data.slides.map((slide) => ({ ...slide })) : [];
    state.selectedSlideId = data.selectedSlideId || state.slides[0]?.id || null;
    state.textBottomOffset = Number(data.textBottomOffset || 130);
    state.textFontSize = Number(data.textFontSize || 54);
    state.bgMusicVolume = Number(data.bgMusicVolume || 35);
    if (elements.turboRenderCheckbox && data.render) {
      elements.turboRenderCheckbox.checked = data.render.turboMode !== false;
    }
    applyProjectMeta(result.project, result.filePath);
    syncUI();
    await renderPreview();
  } finally {
    isApplyingProjectData = false;
  }
}

function activateTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.target === tabId);
  });
  const displayModes = {
    'tab-content-slides': 'flex',
  };
  Object.entries(displayModes).forEach(([id, display]) => {
    const panel = document.getElementById(id);
    if (panel) panel.style.display = id === tabId ? display : 'none';
  });
}

function updatePreviewChrome() {
  const totalMs = getTotalDurationMs();
  const safePosition = Math.max(0, Math.min(state.previewPositionMs, totalMs || 0));
  elements.previewTimeInline.textContent = `${formatTime(safePosition)} / ${formatTime(totalMs)}`;
  elements.previewSeek.value = totalMs > 0 ? String(Math.round((safePosition / totalMs) * 1000)) : '0';
  elements.previewPlayBtn.textContent = state.previewPlaying ? '⏸' : '▶';
  elements.previewMuteBtn.textContent = state.previewMuted ? '🔇' : '🔊';
}

function tickPreviewClock() {
  if (!state.previewPlaying) return;
  const totalMs = getTotalDurationMs();
  state.previewPositionMs = Math.min(totalMs, Date.now() - state.previewStartedAt);
  updatePreviewChrome();
  if (state.previewPositionMs >= totalMs) {
    pausePreview();
    return;
  }
  state.previewRafId = window.requestAnimationFrame(tickPreviewClock);
}

function playPreview() {
  const api = previewApi();
  state.previewPlaying = true;
  state.previewStartedAt = Date.now() - state.previewPositionMs;
  api?.play?.();
  updatePreviewChrome();
  window.cancelAnimationFrame(state.previewRafId);
  state.previewRafId = window.requestAnimationFrame(tickPreviewClock);
}

function pausePreview() {
  const api = previewApi();
  state.previewPlaying = false;
  api?.pause?.();
  window.cancelAnimationFrame(state.previewRafId);
  updatePreviewChrome();
}

function seekPreview(ms) {
  const totalMs = getTotalDurationMs();
  state.previewPositionMs = Math.max(0, Math.min(ms, totalMs || 0));
  previewApi()?.seekToFrame?.(Math.round((state.previewPositionMs / 1000) * FPS));
  if (state.previewPlaying) state.previewStartedAt = Date.now() - state.previewPositionMs;
  updatePreviewChrome();
}

function togglePreviewPlayback() {
  if (state.previewPlaying) pausePreview();
  else playPreview();
}

function togglePreviewMute() {
  state.previewMuted = !state.previewMuted;
  previewApi()?.setMuted?.(state.previewMuted);
  updatePreviewChrome();
}

function restartPreview(shouldPlay = false) {
  seekPreview(0);
  if (shouldPlay) playPreview();
}

async function togglePreviewFullscreen() {
  const target = document.getElementById('preview-stage-shell') || elements.previewStage;
  if (!document.fullscreenElement) {
    await target.requestFullscreen?.();
  } else {
    await document.exitFullscreen?.();
  }
}

async function handleRender() {
  if (state.slides.length === 0 || state.isRendering) return;

  state.isRendering = true;
  elements.renderBtn.disabled = true;
  elements.renderBtn.style.display = 'none';
  elements.cancelRenderBtn.style.display = 'inline-flex';
  elements.renderResult.innerHTML = '';
  setStatus('جاري الرندر', 'يتم الآن تجهيز فيديو متابعات.');
  setProgress(0.02, 'بدء مهمة الرندر...');

  try {
    const result = await window.desktopApi.render({
      model: 'mutabaat',
      compositionId: 'MutabaatVideo',
      slides: state.slides.map((slide) => ({ ...slide })),
      bgMusicVolume: Number(state.bgMusicVolume || 0) / 100,
      textBottomOffset: Number(state.textBottomOffset || 130),
      textFontSize: Number(state.textFontSize || 54),
      turboMode: elements.turboRenderCheckbox?.checked !== false,
    });
    setStatus('اكتمل الرندر', 'تم حفظ الفيديو بنجاح.');
    setProgress(1, 'اكتمل الرندر');
    elements.renderResult.innerHTML = result?.outputPath
      ? `<div class="result-card">
          <strong>تم حفظ الفيديو</strong>
          <span class="muted">${escapeHtml(result.outputPath)}</span>
          <div class="result-actions">
            <button id="mutabaat-reveal-file-btn" class="btn secondary small">إظهار الملف</button>
            <button id="mutabaat-open-folder-btn" class="btn secondary small">فتح المجلد</button>
          </div>
        </div>`
      : 'اكتمل الرندر.';
    document.getElementById('mutabaat-reveal-file-btn')?.addEventListener('click', () => window.desktopApi.revealInFolder(result.outputPath));
    document.getElementById('mutabaat-open-folder-btn')?.addEventListener('click', () => window.desktopApi.openOutputFolder());
  } catch (error) {
    setStatus('فشل الرندر', error?.message || 'حدث خطأ غير متوقع أثناء الرندر.');
    setProgress(0, 'فشل الرندر');
    elements.renderResult.textContent = error?.message || 'تعذر إكمال الرندر';
  } finally {
    state.isRendering = false;
    elements.renderBtn.disabled = false;
    elements.renderBtn.style.display = 'inline-flex';
    elements.cancelRenderBtn.style.display = 'none';
  }
}

function bindEvents() {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => activateTab(button.dataset.target));
  });
  elements.pickSlidesBtn.addEventListener('click', handlePickSlides);
  elements.emptyState.addEventListener('click', handlePickSlides);
  elements.emptyState.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handlePickSlides();
  });
  elements.projectSaveBtn.addEventListener('click', () => saveCurrentProject());
  elements.projectOpenBtn.addEventListener('click', openProjectFromDisk);
  elements.openOutputBtn.addEventListener('click', () => window.desktopApi.openOutputFolder());
  elements.renderBtn.addEventListener('click', handleRender);
  elements.cancelRenderBtn.addEventListener('click', async () => {
    const canceled = await window.desktopApi.cancelRender({ model: 'mutabaat' });
    if (canceled) {
      setStatus('تم الإيقاف', 'تم إيقاف عملية الرندر بناء على طلبك.');
      setProgress(0, 'تم الإيقاف');
    }
  });

  elements.previewPlayBtn.addEventListener('click', togglePreviewPlayback);
  elements.previewMuteBtn.addEventListener('click', togglePreviewMute);
  elements.previewRestartBtn.addEventListener('click', () => restartPreview(state.previewPlaying));
  elements.previewFullscreenBtn.addEventListener('click', togglePreviewFullscreen);
  elements.previewStage.addEventListener('click', togglePreviewPlayback);
  elements.previewSeek.addEventListener('input', (event) => {
    const totalMs = getTotalDurationMs();
    seekPreview((Number(event.target.value) / 1000) * totalMs);
  });
}

async function bootstrap() {
  const data = await window.desktopApi.bootstrap();
  state.appVersion = data.appVersion || state.appVersion;
  state.assetsDir = data.assetsDir || state.assetsDir;
  if (data.logoDataUrl) elements.brandLogo.src = data.logoDataUrl;
  syncUI();
  setStatus('حفظ الفيديو', 'لم يبدأ الحفظ بعد');
  setProgress(0, 'في الانتظار...');
  previewApi()?.mount?.(elements.previewExactRoot);
  await renderPreview();
  bindEvents();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  const unsubscribe = window.desktopApi.onRenderProgress((payload) => {
    if (!payload) return;
    if (payload.stage === 'queued') setProgress(0.05, payload.message);
    else if (payload.stage === 'bundle') setProgress(0.1 + ((payload.progress || 0) * 0.1), payload.message);
    else if (payload.stage === 'composition') setProgress(0.2 + ((payload.progress || 0) * 0.1), payload.message);
    else if (payload.stage === 'render') setProgress(0.3 + ((payload.progress || 0) * 0.7), payload.message);
  });
  window.addEventListener('beforeunload', () => {
    unsubscribe?.();
    previewApi()?.destroy?.();
    pausePreview();
  });
}

bootstrap().catch((error) => {
  console.error(error);
  setStatus('تعذر التشغيل', error?.message || 'فشل تهيئة واجهة متابعات');
});
