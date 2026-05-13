import { PersonalitiesSlideData } from './types';

export const DEFAULT_IMAGE_DURATION_MS = 8000;

export function isVideoSlide(slide: PersonalitiesSlideData): boolean {
  return slide.mediaType === 'video';
}

export function getSlideDurationMs(slide: PersonalitiesSlideData): number {
  if (isVideoSlide(slide)) {
    const start = slide.trimStartMs || 0;
    let end: number;
    if (slide.trimEndMs != null && slide.trimEndMs > 0) {
      end = slide.trimEndMs;
    } else if (slide.mediaDurationMs && slide.mediaDurationMs > 0) {
      end = slide.mediaDurationMs;
    } else if (slide.durationMs > 0) {
      end = slide.durationMs;
    } else {
      return 0;
    }
    return Math.max(0, end - start);
  }
  return slide.durationMs > 0 ? slide.durationMs : DEFAULT_IMAGE_DURATION_MS;
}

export function buildTimeline(slides: PersonalitiesSlideData[]): { startMs: number; durationMs: number }[] {
  let currentStart = 0;
  return slides.map((slide) => {
    const durationMs = getSlideDurationMs(slide);
    const entry = { startMs: currentStart, durationMs };
    currentStart += durationMs;
    return entry;
  });
}

export function getTotalSlidesDurationMs(slides: PersonalitiesSlideData[]): number {
  return slides.reduce((sum, slide) => sum + getSlideDurationMs(slide), 0);
}

export function msToFrames(ms: number, fps: number): number {
  return Math.max(1, Math.round((ms / 1000) * fps));
}
