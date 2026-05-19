/* Content generation controls for the Qawaleb renderer. Requires app-config.js and app.js. */
// ??? Content Generation ───────────────────────────────────────────────────────

async function handleGenerateContentSlides() {
  const topicInput = document.getElementById('content-topic-input');
  const slideCountInput = document.getElementById('content-slide-count');
  const contentStyleSelect = document.getElementById('content-style-select');
  const presetSelect = document.getElementById('content-preset-select');
  const btn = document.getElementById('generate-content-btn');
  const status = document.getElementById('content-generate-status');
  const scriptPreview = document.getElementById('content-script-preview');

  const topic = topicInput ? topicInput.value.trim() : '';
  if (!topic) {
    if (status) status.textContent = 'يرجى كتابة موضوع أو نص أولاً';
    return;
  }

  const count = slideCountInput ? Number(slideCountInput.value) || 10 : 10;
  const contentStyle = contentStyleSelect ? contentStyleSelect.value : 'informative';
  const textPreset = presetSelect ? presetSelect.value : 'automatic';
  const maxWordsInput = document.getElementById('content-max-words');
  const slideDurationInput = document.getElementById('content-slide-duration');
  const maxWords = maxWordsInput ? Math.max(8, Math.min(30, Number(maxWordsInput.value) || 18)) : 18;
  const slideDuration = slideDurationInput ? Math.max(4, Math.min(20, Number(slideDurationInput.value) || 8)) : 8;

  if (btn) { btn.disabled = true; btn.textContent = 'جاري التوليد...'; }
  if (status) status.textContent = 'جاري الاتصال بـ Gemini...';
  if (scriptPreview) { scriptPreview.value = ''; scriptPreview.placeholder = 'جاري توليد السكريبت...'; }

  try {
    const result = await window.desktopApi.generateContentSlides({
      topic,
      count,
      contentStyle,
      textPreset,
      maxWords,
      systemPrompt: getInspectorSystemPrompt(),
      apiKey: state.settings.geminiApiKey || '',
    });

    if (!result.success) {
      throw new Error(result.error || 'فشل توليد الشرائح');
    }
    if (!Array.isArray(result.slides) || result.slides.length === 0) {
      throw new Error('لم يتم الحصول على شرائح من Gemini');
    }

    // Replace all slides with newly generated ones (fresh content session)
    state.slides = result.slides;
    state.selectedSlideId = result.slides[0].id;

    // Set slide duration from the content tab control
    state.slideDurationInSeconds = slideDuration;
    const durationInput = document.getElementById('slide-duration-input');
    if (durationInput) durationInput.value = slideDuration;

    // Apply text preset if not automatic
    if (textPreset && textPreset !== 'automatic') {
      state.textPreset = textPreset;
      const presetEl = document.getElementById('text-preset-select');
      if (presetEl) presetEl.value = textPreset;
    }

    // Populate the editable script textarea
    if (scriptPreview) {
      scriptPreview.value = result.fullScript || result.slides.map((s) => s.voiceoverText || s.text || '').join('\n\n');
      scriptPreview.placeholder = 'السكريبت الكامل للتعليق الصوتي...';
    }

    renderSlides();
    markProjectDirty();
    renderPreviewFrame();
    if (status) status.textContent = `✅ تم توليد ${result.slides.length} شريحة — راجع السكريبت أدناه`;
    setStatus('المحتوى', `تم إنشاء ${result.slides.length} شريحة من Gemini`);
  } catch (err) {
    if (status) status.textContent = `❌ ${err.message}`;
    if (scriptPreview) scriptPreview.placeholder = 'السكريبت الكامل للتعليق الصوتي...';
    setStatus('خطأ', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="sparkles" style="width:18px;height:18px;"></i> توليد الشرائح والسكريبت';
      if (window.lucide) lucide.createIcons({ nodes: [btn.querySelector('[data-lucide]')] });
    }
  }
}

async function handleGenerateScriptVoiceover() {
  const btn = document.getElementById('generate-script-audio-btn');
  const statusEl = document.getElementById('script-audio-status');
  const scriptPreview = document.getElementById('content-script-preview');

  const scriptText = scriptPreview ? scriptPreview.value.trim() : '';
  if (!scriptText) {
    if (statusEl) statusEl.textContent = 'السكريبت فارغ — يرجى توليد الشرائح أولاً';
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'جاري التوليد...'; }
  if (statusEl) statusEl.textContent = 'جاري توليد الصوت...';

  try {
    const result = await window.desktopApi.generateSingleVoiceover({
      text: scriptText,
      apiKey: state.settings.geminiApiKey || '',
      ttsModel: state.settings.ttsModel || DEFAULT_SETTINGS.ttsModel,
      voiceName: state.settings.ttsVoice || DEFAULT_SETTINGS.ttsVoice,
      stylePrompt: getInspectorTtsStyle(),
    });

    if (!result.success) throw new Error(result.error || 'فشل توليد الصوت');

    state.voiceover = result.voiceoverPath;
    state.voiceoverDurationMs = result.durationMs || 0;

    const label = 'سكريبت المحتوى';
    if (elements.voiceoverFilename) {
      elements.voiceoverFilename.textContent = label;
      elements.voiceoverFilename.title = scriptText.slice(0, 80);
    }
    updateVoiceoverMeta();
    markProjectDirty();
    renderPreviewFrame();

    if (statusEl) statusEl.textContent = `✅ تم التوليد — ${(state.voiceoverDurationMs / 1000).toFixed(1)}ث`;
    setStatus('اكتمل', 'تم توليد صوت السكريبت بنجاح');
  } catch (err) {
    if (statusEl) statusEl.textContent = `❌ ${err.message}`;
    setStatus('خطأ', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="mic" style="width:16px;height:16px;"></i> توليد صوت الاسكريبت';
      if (window.lucide) lucide.createIcons({ nodes: [btn.querySelector('[data-lucide]')] });
    }
  }
}

const generateContentBtn = document.getElementById('generate-content-btn');
if (generateContentBtn) {
  generateContentBtn.addEventListener('click', handleGenerateContentSlides);
}

const generateScriptAudioBtn = document.getElementById('generate-script-audio-btn');
if (generateScriptAudioBtn) {
  generateScriptAudioBtn.addEventListener('click', handleGenerateScriptVoiceover);
}

const copyScriptBtn = document.getElementById('copy-script-btn');
if (copyScriptBtn) {
  copyScriptBtn.addEventListener('click', () => {
    const scriptPreview = document.getElementById('content-script-preview');
    if (!scriptPreview || !scriptPreview.value.trim()) return;
    navigator.clipboard.writeText(scriptPreview.value).then(() => {
      const orig = copyScriptBtn.textContent;
      copyScriptBtn.textContent = '✓ تم النسخ';
      setTimeout(() => { copyScriptBtn.textContent = orig; }, 1500);
    });
  });
}

// ───
