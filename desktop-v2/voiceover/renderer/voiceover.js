// ── Voice catalogue ──────────────────────────────────────────────────────────
const VOICES = [
  { name: 'Zephyr', tone: 'Bright', toneAr: 'مشرق', gender: 'f' },
  { name: 'Puck', tone: 'Upbeat', toneAr: 'متحمس', gender: 'm' },
  { name: 'Charon', tone: 'Informational', toneAr: 'إخباري', gender: 'm' },
  { name: 'Kore', tone: 'Firm', toneAr: 'حازم', gender: 'f' },
  { name: 'Fenrir', tone: 'Excitable', toneAr: 'متهيج', gender: 'm' },
  { name: 'Leda', tone: 'Youthful', toneAr: 'شبابي', gender: 'f' },
  { name: 'Orus', tone: 'Firm', toneAr: 'حازم', gender: 'm' },
  { name: 'Aoede', tone: 'Breezy', toneAr: 'منعش', gender: 'f' },
  { name: 'Callirrhoe', tone: 'Easy-going', toneAr: 'هادئ', gender: 'f' },
  { name: 'Autonoe', tone: 'Bright', toneAr: 'مشرق', gender: 'f' },
  { name: 'Enceladus', tone: 'Breathy', toneAr: 'ناعم', gender: 'm' },
  { name: 'Iapetus', tone: 'Clear', toneAr: 'واضح', gender: 'm' },
  { name: 'Umbriel', tone: 'Easy-going', toneAr: 'هادئ', gender: 'm' },
  { name: 'Algieba', tone: 'Smooth', toneAr: 'سلس', gender: 'm' },
  { name: 'Despina', tone: 'Smooth', toneAr: 'سلس', gender: 'f' },
  { name: 'Erinome', tone: 'Clear', toneAr: 'واضح', gender: 'f' },
  { name: 'Algenib', tone: 'Gravelly', toneAr: 'خشن', gender: 'm' },
  { name: 'Rasalhaghue', tone: 'Informational', toneAr: 'إخباري', gender: 'm' },
  { name: 'Laomedeia', tone: 'Upbeat', toneAr: 'متحمس', gender: 'f' },
  { name: 'Achernar', tone: 'Soft', toneAr: 'ناعم جداً', gender: 'f' },
  { name: 'Alnilam', tone: 'Firm', toneAr: 'حازم', gender: 'm' },
  { name: 'Schedar', tone: 'Even', toneAr: 'متوازن', gender: 'm' },
  { name: 'Gacrux', tone: 'Mature', toneAr: 'ناضج', gender: 'f' },
  { name: 'Pulcherrima', tone: 'Forward', toneAr: 'مباشر', gender: 'f' },
  { name: 'Achird', tone: 'Friendly', toneAr: 'ودود', gender: 'm' },
  { name: 'Zubenelgenubi', tone: 'Casual', toneAr: 'عفوي', gender: 'm' },
  { name: 'Vindemiatrix', tone: 'Gentle', toneAr: 'لطيف', gender: 'f' },
  { name: 'Sadachbia', tone: 'Lively', toneAr: 'حيوي', gender: 'f' },
  { name: 'Sadaltager', tone: 'Knowledgeable', toneAr: 'واثق', gender: 'm' },
  { name: 'Sulafat', tone: 'Warm', toneAr: 'دافئ', gender: 'f' },
];

const TONE_COLOR = {
  Bright: '#f59e0b',
  Upbeat: '#10b981',
  Informational: '#3b82f6',
  Firm: '#6366f1',
  Excitable: '#ef4444',
  Youthful: '#ec4899',
  Breezy: '#06b6d4',
  'Easy-going': '#84cc16',
  Breathy: '#a78bfa',
  Clear: '#22d3ee',
  Gravelly: '#78716c',
  Smooth: '#14b8a6',
  Soft: '#f472b6',
  Even: '#94a3b8',
  Mature: '#d97706',
  Forward: '#f97316',
  Friendly: '#4ade80',
  Casual: '#facc15',
  Gentle: '#c084fc',
  Lively: '#fb7185',
  Knowledgeable: '#60a5fa',
  Warm: '#fb923c',
};

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  ttsModel: 'gemini-2.5-flash-preview-tts',
  ttsVoice: 'Charon',
  ttsStylePrompt: '',
};
const PREVIEW_TEXT = 'مرحباً، هذا مقطع صوتي تجريبي لاختبار جودة الصوت وأسلوب القراءة.';

// ── State ────────────────────────────────────────────────────────────────────
let selectedVoice = DEFAULT_SETTINGS.ttsVoice;
let savedSettings = { ...DEFAULT_SETTINGS };
let isGenerating = false;
let previewingVoice = null;
let playingVoice = null;
let previewUrls = {};
let currentFilePath = null;

// ── DOM refs ─────────────────────────────────────────────────────────────────
const voText = document.getElementById('vo-text');
const charCount = document.getElementById('char-count');
const modelSelect = document.getElementById('model-select');
const voInstructions = document.getElementById('vo-instructions');
const generateBtn = document.getElementById('generate-btn');
const voError = document.getElementById('vo-error');
const playerCard = document.getElementById('player-card');
const mainAudio = document.getElementById('main-audio');
const playerMeta = document.getElementById('player-meta');
const downloadBtn = document.getElementById('download-btn');
const previewAudio = document.getElementById('preview-audio');
const voiceGrid = document.getElementById('voice-grid');
const activeVoiceDot = document.getElementById('active-voice-dot');
const activeVoiceName = document.getElementById('active-voice-name');
const activeVoiceMeta = document.getElementById('active-voice-meta');
const settingsBtn = document.getElementById('settings-btn');
const settingsOverlay = document.getElementById('settings-modal-overlay');
const settingsCloseBtn = document.getElementById('settings-modal-close-btn');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');
const settingsApiKey = document.getElementById('settings-api-key');
const settingsTtsModel = document.getElementById('settings-tts-model');
const settingsTtsStylePrompt = document.getElementById('settings-tts-style-prompt');
const apiKeyStatus = document.getElementById('api-key-status');
const settingsStatus = document.getElementById('settings-status');
const toggleApiKeyBtn = document.getElementById('toggle-api-key-visibility');
const eyeIcon = document.getElementById('eye-icon');

document.addEventListener('DOMContentLoaded', async () => {
  refreshIcons();
  await loadBrandLogo();
  await loadSavedSettings();
  applySavedSettingsToControls();
  buildVoiceGrid();
  updateActiveBadge();
  attachEvents();
});

function attachEvents() {
  voText.addEventListener('input', updateInputState);
  generateBtn.addEventListener('click', handleGenerateAudio);
  downloadBtn.addEventListener('click', handleDownload);
  modelSelect.addEventListener('change', () => {
    savedSettings.ttsModel = modelSelect.value;
    previewUrls = {};
    stopPreview();
  });

  if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
  if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettingsModal);
  if (settingsCancelBtn) settingsCancelBtn.addEventListener('click', closeSettingsModal);
  if (settingsSaveBtn) settingsSaveBtn.addEventListener('click', saveSettings);
  if (settingsOverlay) {
    settingsOverlay.addEventListener('click', (event) => {
      if (event.target === settingsOverlay) closeSettingsModal();
    });
  }
  if (settingsApiKey) settingsApiKey.addEventListener('input', () => updateApiKeyStatus(settingsApiKey.value));
  if (toggleApiKeyBtn) toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && settingsOverlay?.classList.contains('is-active')) {
      closeSettingsModal();
    }
  });

  previewAudio.addEventListener('ended', () => {
    if (playingVoice) updatePreviewBtn(playingVoice, 'idle');
    playingVoice = null;
  });
}

async function loadBrandLogo() {
  if (!hasDesktopApi()) return;
  try {
    const payload = await window.desktopApi.bootstrap();
    const brandLogo = document.getElementById('brand-logo');
    if (brandLogo && payload?.logoDataUrl) {
      brandLogo.src = payload.logoDataUrl;
    } else if (brandLogo && payload?.logoPath) {
      brandLogo.src = window.desktopApi.toFileUrl(payload.logoPath);
    }
  } catch {}
}

async function loadSavedSettings() {
  if (!hasDesktopApi()) return;
  try {
    const settings = await window.desktopApi.getSettings();
    savedSettings = normalizeSettings(settings);
  } catch {
    savedSettings = { ...DEFAULT_SETTINGS };
  }
}

function normalizeSettings(settings = {}) {
  return {
    ...settings,
    geminiApiKey: typeof settings.geminiApiKey === 'string' ? settings.geminiApiKey : '',
    ttsModel: typeof settings.ttsModel === 'string' ? settings.ttsModel : DEFAULT_SETTINGS.ttsModel,
    ttsVoice: isKnownVoice(settings.ttsVoice) ? settings.ttsVoice : DEFAULT_SETTINGS.ttsVoice,
    ttsStylePrompt: typeof settings.ttsStylePrompt === 'string' ? settings.ttsStylePrompt : '',
  };
}

function applySavedSettingsToControls() {
  selectedVoice = savedSettings.ttsVoice;
  modelSelect.value = savedSettings.ttsModel;
  if (savedSettings.ttsStylePrompt && !voInstructions.value.trim()) {
    voInstructions.value = savedSettings.ttsStylePrompt;
  }
  updateInputState();
}

function buildVoiceGrid() {
  voiceGrid.textContent = '';
  VOICES.forEach((voice) => voiceGrid.appendChild(createVoiceCard(voice)));
  refreshIcons();
}

function createVoiceCard(voice) {
  const color = TONE_COLOR[voice.tone] || '#3b82f6';
  const isSelected = voice.name === selectedVoice;
  const card = document.createElement('div');
  card.className = `vo-voice-card${isSelected ? ' selected' : ''}`;
  card.style.borderColor = isSelected ? color : 'transparent';
  card.dataset.voice = voice.name;

  const top = document.createElement('div');
  top.className = 'vo-voice-top';
  top.appendChild(createTextElement('span', 'vo-voice-name', voice.name));
  if (isSelected) {
    const check = document.createElement('span');
    check.className = 'vo-voice-check';
    check.appendChild(createIcon('check'));
    top.appendChild(check);
  }

  const tone = createTextElement('span', 'vo-tone-badge', voice.tone);
  tone.style.background = `${color}22`;
  tone.style.color = color;
  tone.style.border = `1px solid ${color}44`;

  const meta = createTextElement('div', 'vo-voice-meta', `${voice.toneAr} · ${voice.gender === 'f' ? 'أنثى' : 'ذكر'}`);

  const previewBtn = document.createElement('button');
  previewBtn.type = 'button';
  previewBtn.className = 'vo-preview-btn';
  previewBtn.dataset.voice = voice.name;
  previewBtn.title = 'معاينة الصوت';
  setButtonContent(previewBtn, 'play', 'معاينة');

  card.append(top, tone, meta, previewBtn);
  card.addEventListener('click', (event) => {
    if (event.target.closest('.vo-preview-btn')) return;
    selectVoice(voice.name);
  });
  previewBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (playingVoice === voice.name) {
      stopPreview();
    } else {
      handlePreviewVoice(voice.name);
    }
  });
  return card;
}

function selectVoice(name) {
  if (!isKnownVoice(name)) return;
  selectedVoice = name;
  savedSettings.ttsVoice = name;
  buildVoiceGrid();
  updateActiveBadge();
}

function updateActiveBadge() {
  const voice = VOICES.find((item) => item.name === selectedVoice);
  if (!voice) return;
  const color = TONE_COLOR[voice.tone] || '#3b82f6';
  activeVoiceDot.style.background = color;
  activeVoiceName.textContent = voice.name;
  activeVoiceMeta.textContent = `${voice.toneAr} · ${voice.gender === 'f' ? 'أنثى' : 'ذكر'}`;
}

async function handleGenerateAudio() {
  const text = voText.value.trim();
  if (!text || isGenerating) return;

  setGenerating(true);
  hideError();
  playerCard.style.display = 'none';

  try {
    ensureDesktopApi();
    const result = await window.desktopApi.generateSingleVoiceover({
      text,
      voiceName: selectedVoice,
      ttsModel: modelSelect.value,
      apiKey: savedSettings.geminiApiKey || undefined,
      stylePrompt: getActiveStylePrompt(),
    });

    if (!result.success) throw new Error(result.error);

    currentFilePath = result.voiceoverPath;
    mainAudio.src = result.voiceoverUrl;
    playerMeta.textContent = `${selectedVoice} · ${formatModelName(modelSelect.value)}`;
    playerCard.style.display = 'flex';
    setTimeout(() => mainAudio.play().catch(() => {}), 200);
  } catch (error) {
    showError(error.message || 'حدث خطأ غير متوقع');
  } finally {
    setGenerating(false);
  }
}

async function handlePreviewVoice(voiceName) {
  if (previewingVoice === voiceName) return;

  stopPreview();

  if (previewUrls[voiceName]) {
    playPreview(voiceName, previewUrls[voiceName]);
    return;
  }

  previewingVoice = voiceName;
  updatePreviewBtn(voiceName, 'loading');

  try {
    ensureDesktopApi();
    const result = await window.desktopApi.generateSingleVoiceover({
      text: PREVIEW_TEXT,
      voiceName,
      ttsModel: modelSelect.value,
      apiKey: savedSettings.geminiApiKey || undefined,
      stylePrompt: getActiveStylePrompt(),
    });

    if (!result.success) throw new Error(result.error);

    previewUrls[voiceName] = result.voiceoverUrl;
    playPreview(voiceName, result.voiceoverUrl);
  } catch (error) {
    updatePreviewBtn(voiceName, 'idle');
    showError(error.message || 'تعذر تشغيل المعاينة');
  } finally {
    previewingVoice = null;
  }
}

function playPreview(voiceName, url) {
  playingVoice = voiceName;
  previewAudio.src = url;
  previewAudio.play().catch(() => {});
  updatePreviewBtn(voiceName, 'playing');
}

function stopPreview() {
  previewAudio.pause();
  try { previewAudio.currentTime = 0; } catch {}
  if (playingVoice) updatePreviewBtn(playingVoice, 'idle');
  playingVoice = null;
}

function updatePreviewBtn(voiceName, state) {
  const btn = voiceGrid.querySelector(`.vo-preview-btn[data-voice="${escapeCssValue(voiceName)}"]`);
  if (!btn) return;
  btn.classList.toggle('playing', state === 'playing');
  btn.disabled = state === 'loading';
  if (state === 'loading') {
    setButtonContent(btn, 'loader-2', 'تحميل', 'spin');
  } else if (state === 'playing') {
    setButtonContent(btn, 'square', 'إيقاف');
  } else {
    setButtonContent(btn, 'play', 'معاينة');
  }
  refreshIcons();
}

async function handleDownload() {
  if (!currentFilePath) return;
  try {
    ensureDesktopApi();
    await window.desktopApi.revealInFolder(currentFilePath);
  } catch {
    try { await window.desktopApi.openFile(currentFilePath); } catch {}
  }
}

function openSettingsModal() {
  if (!settingsOverlay) return;
  settingsApiKey.value = savedSettings.geminiApiKey || '';
  settingsTtsModel.value = modelSelect.value || savedSettings.ttsModel;
  settingsTtsStylePrompt.value = voInstructions.value.trim() || savedSettings.ttsStylePrompt || '';
  updateApiKeyStatus(settingsApiKey.value);
  setSettingsStatus('');
  settingsOverlay.classList.add('is-active');
  settingsOverlay.setAttribute('aria-hidden', 'false');
  settingsApiKey.focus();
}

function closeSettingsModal() {
  if (!settingsOverlay) return;
  settingsOverlay.classList.remove('is-active');
  settingsOverlay.setAttribute('aria-hidden', 'true');
}

async function saveSettings() {
  if (!hasDesktopApi()) {
    setSettingsStatus('حفظ الإعدادات متاح عند تشغيل التطبيق من سطح المكتب.');
    return;
  }

  const nextSettings = {
    ...savedSettings,
    geminiApiKey: settingsApiKey.value.trim(),
    ttsModel: settingsTtsModel.value || DEFAULT_SETTINGS.ttsModel,
    ttsVoice: selectedVoice,
    ttsStylePrompt: settingsTtsStylePrompt.value.trim(),
  };

  setSettingsStatus('جارِ الحفظ...');
  const result = await window.desktopApi.saveSettings(nextSettings);
  if (result?.success) {
    savedSettings = normalizeSettings(nextSettings);
    modelSelect.value = savedSettings.ttsModel;
    voInstructions.value = savedSettings.ttsStylePrompt;
    previewUrls = {};
    updateApiKeyStatus(savedSettings.geminiApiKey);
    closeSettingsModal();
    hideError();
  } else {
    setSettingsStatus(result?.error || 'فشل حفظ الإعدادات.');
  }
}

function toggleApiKeyVisibility() {
  const isPassword = settingsApiKey.type === 'password';
  settingsApiKey.type = isPassword ? 'text' : 'password';
  if (eyeIcon) eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
  refreshIcons();
}

function updateApiKeyStatus(apiKey) {
  if (!apiKeyStatus) return;
  apiKeyStatus.textContent = '';
  const badge = document.createElement('span');
  const hasKey = apiKey && apiKey.trim().length > 10;
  badge.className = `settings-status-badge ${hasKey ? 'ok' : 'missing'}`;
  badge.textContent = hasKey ? 'مفتاح محفوظ' : 'لم يضف مفتاح بعد';
  apiKeyStatus.appendChild(badge);
}

function setSettingsStatus(text) {
  if (!settingsStatus) return;
  settingsStatus.textContent = text;
  settingsStatus.style.display = text ? 'inline-flex' : 'none';
}

function setGenerating(value) {
  isGenerating = value;
  generateBtn.disabled = value || !voText.value.trim();
  setButtonContent(generateBtn, value ? 'loader-2' : 'mic', value ? 'جارِ التوليد...' : 'توليد الصوت', value ? 'spin' : '');
  refreshIcons();
}

function updateInputState() {
  charCount.textContent = voText.value.length;
  generateBtn.disabled = !voText.value.trim() || isGenerating;
}

function showError(message) {
  voError.textContent = `تنبيه: ${message}`;
  voError.style.display = 'block';
}

function hideError() {
  voError.style.display = 'none';
}

function getActiveStylePrompt() {
  return voInstructions.value.trim() || savedSettings.ttsStylePrompt || undefined;
}

function formatModelName(modelName) {
  return modelName.replace('gemini-2.5-', '').replace('-preview-tts', '');
}

function hasDesktopApi() {
  return Boolean(window.desktopApi);
}

function ensureDesktopApi() {
  if (!hasDesktopApi()) {
    throw new Error('هذه العملية تحتاج تشغيل تطبيق سطح المكتب.');
  }
}

function isKnownVoice(name) {
  return VOICES.some((voice) => voice.name === name);
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function createIcon(name, className = '') {
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', name);
  if (className) icon.className = className;
  return icon;
}

function setButtonContent(button, iconName, text, iconClass = '') {
  button.textContent = '';
  button.append(createIcon(iconName, iconClass), document.createTextNode(` ${text}`));
}

function refreshIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function escapeCssValue(value) {
  if (window.CSS?.escape) return window.CSS.escape(value);
  return String(value).replace(/["\\]/g, '\\$&');
}
