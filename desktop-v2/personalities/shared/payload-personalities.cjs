const fs = require('fs');
const path = require('path');

function normalizePersonalitiesSlides(slides) {
  return (Array.isArray(slides) ? slides : [])
    .filter((slide) => slide && slide.imagePath)
    .map((slide, index) => ({
      id: slide.id || `pslide-${Date.now()}-${index}`,
      imagePath: slide.imagePath,
      mediaPath: slide.imagePath,
      mediaType: slide.mediaType === 'video' ? 'video' : 'image',
      isMuted: slide.isMuted !== false,
      durationMs: Number(slide.durationMs) || 8000,
      mediaDurationMs: Number(slide.mediaDurationMs) || 0,
      trimStartMs: Number(slide.trimStartMs) || 0,
      trimEndMs: slide.trimEndMs == null ? null : Number(slide.trimEndMs) || null,
    }));
}

function normalizeNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizePersonalitiesPayload(paths, payload) {
  const slides = normalizePersonalitiesSlides(payload.slides);
  if (slides.length === 0) {
    throw new Error('No slides selected');
  }

  const musicPath = payload.music && fs.existsSync(payload.music) ? payload.music : null;
  const voiceoverPath = payload.voiceover && fs.existsSync(payload.voiceover) ? payload.voiceover : null;
  const endPagePath = payload.endPage && fs.existsSync(payload.endPage) ? payload.endPage : null;

  const mainVoiceoverDurationMs = normalizeNumber(payload.mainVoiceoverDurationMs || payload.voiceoverDurationMs, 0);
  const timelineDurationMs = normalizeNumber(payload.timelineDurationMs, 0);
  const finalDurationMs = mainVoiceoverDurationMs > 0 ? mainVoiceoverDurationMs : timelineDurationMs;

  return {
    slides,
    musicPath,
    voiceoverPath,
    mainVoiceoverPath: voiceoverPath,
    mainVoiceoverDurationMs,
    endPagePath,
    endPageDurationFrames: normalizeNumber(payload.endPageDurationFrames, 0),
    musicVolume: normalizeNumber(payload.musicVolume, 50),
    voiceoverVolume: normalizeNumber(payload.voiceoverVolume, 100),
    finalDurationMs,
    timelineDurationMs,
    turboMode: payload.turboMode === true,
  };
}

module.exports = {
  normalizePersonalitiesPayload,
};
