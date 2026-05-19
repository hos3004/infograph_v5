/* Prompt inspector and settings modal controls. Requires app-config.js and app.js. */
// ??? Prompt Inspector ─────────────────────────────────────────────────────

function updatePromptInspector() {
  const ttsEl = document.getElementById('prompt-inspector-tts');
  const contentEl = document.getElementById('prompt-inspector-content');
  if (ttsEl && !ttsEl._userEdited) ttsEl.value = state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT;
  if (contentEl && !contentEl._userEdited) contentEl.value = state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT;
}

function getInspectorTtsStyle() {
  const el = document.getElementById('prompt-inspector-tts');
  return (el && el.value.trim()) ? el.value.trim() : (state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT);
}

function getInspectorSystemPrompt() {
  const el = document.getElementById('prompt-inspector-content');
  return (el && el.value.trim()) ? el.value.trim() : (state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT);
}

// ─── Settings Modal ────────────────────────────────────────────────────────

function openSettingsModal() {
  const overlay = document.getElementById('settings-modal-overlay');
  if (!overlay) return;

  // Populate fields from state.settings
  const apiKeyInput = document.getElementById('settings-api-key');
  const modelSelect = document.getElementById('settings-tts-model');
  const ttsStylePromptInput = document.getElementById('settings-tts-style-prompt');
  const contentModelSelect = document.getElementById('settings-content-model');
  const contentSystemPromptInput = document.getElementById('settings-content-system-prompt');
  if (apiKeyInput) apiKeyInput.value = state.settings.geminiApiKey || '';
  if (modelSelect) modelSelect.value = state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel;
  if (ttsStylePromptInput) ttsStylePromptInput.value = state.settings.ttsStylePrompt || DEFAULT_TTS_STYLE_PROMPT;
  if (contentModelSelect) contentModelSelect.value = state.settings.contentModel || DEFAULT_SETTINGS.contentModel;
  if (contentSystemPromptInput) contentSystemPromptInput.value = state.settings.contentSystemPrompt || DEFAULT_SYSTEM_PROMPT;

  syncVoiceGrid(state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice);
  updateApiKeyStatus(state.settings.geminiApiKey);

  overlay.classList.add('is-active');
}

function closeSettingsModal() {
  const overlay = document.getElementById('settings-modal-overlay');
  if (overlay) overlay.classList.remove('is-active');
}

function syncVoiceGrid(selectedVoice) {
  document.querySelectorAll('#voice-selection-grid .voice-card').forEach((card) => {
    card.classList.toggle('is-selected', card.dataset.voice === selectedVoice);
  });
}

function updateApiKeyStatus(apiKey) {
  const badge = document.getElementById('api-key-status');
  if (!badge) return;
  if (apiKey && apiKey.trim().length > 10) {
    badge.innerHTML = '<span class="settings-status-badge ok">✓ مفتاح محفوظ</span>';
  } else {
    badge.innerHTML = '<span class="settings-status-badge missing">✗ لم يُضف مفتاح بعد</span>';
  }
}

async function saveSettings() {
  const apiKeyInput = document.getElementById('settings-api-key');
  const modelSelect = document.getElementById('settings-tts-model');
  const ttsStylePromptInput = document.getElementById('settings-tts-style-prompt');
  const selectedVoiceCard = document.querySelector('#voice-selection-grid .voice-card.is-selected');
  const contentModelSelect = document.getElementById('settings-content-model');
  const contentSystemPromptInput = document.getElementById('settings-content-system-prompt');

  const newSettings = {
    geminiApiKey: apiKeyInput ? apiKeyInput.value.trim() : '',
    ttsModel: modelSelect ? modelSelect.value : DEFAULT_SETTINGS.ttsModel,
    ttsVoice: selectedVoiceCard ? selectedVoiceCard.dataset.voice : DEFAULT_SETTINGS.ttsVoice,
    ttsStylePrompt: ttsStylePromptInput ? ttsStylePromptInput.value.trim() || DEFAULT_TTS_STYLE_PROMPT : DEFAULT_TTS_STYLE_PROMPT,
    contentModel: contentModelSelect ? contentModelSelect.value : DEFAULT_SETTINGS.contentModel,
    contentSystemPrompt: contentSystemPromptInput ? contentSystemPromptInput.value : DEFAULT_SYSTEM_PROMPT,
  };

  const result = await window.desktopApi.saveSettings(newSettings);
  if (result.success) {
    state.settings = newSettings;
    updatePromptInspector();
    closeSettingsModal();
    markProjectDirty();
    setStatus('الإعدادات', 'تم حفظ الإعدادات بنجاح');
  } else {
    setStatus('خطأ', 'فشل حفظ الإعدادات');
  }
}

// Gear button
const openSettingsBtn = document.getElementById('settings-btn') || document.getElementById('open-settings-btn');
if (openSettingsBtn) {
  openSettingsBtn.addEventListener('click', openSettingsModal);
}

// Close buttons
const settingsCloseBtn = document.getElementById('settings-modal-close-btn');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettingsModal);
if (settingsCancelBtn) settingsCancelBtn.addEventListener('click', closeSettingsModal);

// Close on backdrop click
const settingsOverlay = document.getElementById('settings-modal-overlay');
if (settingsOverlay) {
  settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) closeSettingsModal();
  });
}

// Save button
const settingsSaveBtn = document.getElementById('settings-save-btn');
if (settingsSaveBtn) {
  settingsSaveBtn.addEventListener('click', saveSettings);
}

// Show/hide API key
const toggleApiKeyBtn = document.getElementById('toggle-api-key-visibility');
if (toggleApiKeyBtn) {
  toggleApiKeyBtn.addEventListener('click', () => {
    const input = document.getElementById('settings-api-key');
    const icon = document.getElementById('eye-icon');
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    if (icon) {
      icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      lucide.createIcons({ nodes: [icon] });
    }
  });
}

// Voice card selection
const voiceGrid = document.getElementById('voice-selection-grid');
if (voiceGrid) {
  voiceGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.voice-card');
    if (!card) return;
    syncVoiceGrid(card.dataset.voice);
  });
}

// Live update of API key status while typing
const apiKeyInput = document.getElementById('settings-api-key');
if (apiKeyInput) {
  apiKeyInput.addEventListener('input', () => updateApiKeyStatus(apiKeyInput.value));
}

bootstrap();
