// Standalone test: verify the timeline math matches requirements
// No Electron/Remotion needed - pure logic test

const FPS = 30;
const DEFAULT_IMAGE_DURATION_MS = 8000;
const TIMELINE_TOLERANCE_MS = 1000;

// Replicate the functions from src/remotion/personalities/timeline.ts
function isVideoSlide(slide) { return slide.mediaType === 'video'; }

function getSlideDurationMs(slide) {
  if (isVideoSlide(slide)) {
    const start = slide.trimStartMs || 0;
    let end;
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

function getTotalSlidesDurationMs(slides) {
  return slides.reduce((sum, s) => sum + getSlideDurationMs(s), 0);
}

function validateTimeline(audioMs, slidesMs, slides) {
  if (!slides || slides.length === 0) {
    return { allowed: false, level: 'error', message: 'لا توجد شرائح للرندر.' };
  }
  if (audioMs > 0 && slidesMs < audioMs) {
    const diff = audioMs - slidesMs;
    if (diff <= TIMELINE_TOLERANCE_MS) {
      return { allowed: true, level: 'info', message: 'المدة متطابقة تقريبًا' };
    }
    return { allowed: true, level: 'warning', message: `سيتم تمديد آخر شريحة حتى نهاية الصوت` };
  }
  if (audioMs > 0 && slidesMs > audioMs) {
    const diff = slidesMs - audioMs;
    if (diff <= TIMELINE_TOLERANCE_MS) {
      return { allowed: true, level: 'info', message: 'المدة متطابقة تقريبًا' };
    }
    return { allowed: true, level: 'warning', message: `سيتم إنهاء الفيديو عند نهاية الصوت` };
  }
  if (audioMs <= 0) {
    return { allowed: true, level: 'info', message: 'لا يوجد صوت رئيسي' };
  }
  return { allowed: true, level: 'info', message: '' };
}

function getFinalDurationMs(audioMs, slidesMs) {
  return audioMs > 0 ? audioMs : slidesMs;
}

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) { passed++; console.log(`  ✓ ${description}`); }
  else { failed++; console.log(`  ✗ ${description}`); }
}

console.log('\n=== Test 1: Image slides default to 8000ms ===');
const slides1 = [
  { id: 's1', mediaType: 'image', durationMs: 0 },
  { id: 's2', mediaType: 'image', durationMs: 4000 },
  { id: 's3', mediaType: 'image', durationMs: 12000 },
];
assert('slide without durationMs defaults to 8000ms', getSlideDurationMs(slides1[0]) === 8000);
assert('slide with 4000ms keeps 4000ms', getSlideDurationMs(slides1[1]) === 4000);
assert('slide with 12000ms keeps 12000ms', getSlideDurationMs(slides1[2]) === 12000);
assert('total = 8000+4000+12000 = 24000', getTotalSlidesDurationMs(slides1) === 24000);

console.log('\n=== Test 2: Video with trim ===');
const video1 = { id: 'v1', mediaType: 'video', mediaDurationMs: 10000, durationMs: 10000, trimStartMs: 1000, trimEndMs: 8000 };
assert('trim 1s to 8s = 7000ms', getSlideDurationMs(video1) === 7000);

const video2 = { id: 'v2', mediaType: 'video', mediaDurationMs: 10000, durationMs: 10000, trimStartMs: 0, trimEndMs: null };
assert('no trim = full 10000ms', getSlideDurationMs(video2) === 10000);

const video3 = { id: 'v3', mediaType: 'video', mediaDurationMs: 15000, durationMs: 15000, trimStartMs: 3000, trimEndMs: null };
assert('trim start only = 12000ms', getSlideDurationMs(video3) === 12000);

const video4 = { id: 'v4', mediaType: 'video', mediaDurationMs: 5000, durationMs: 5000, trimStartMs: 2000, trimEndMs: 1000 };
assert('trim end before start = 0ms (no negative)', getSlideDurationMs(video4) === 0);

console.log('\n=== Test 3: Mixed slides ===');
const mixed = [
  { id: 'm1', mediaType: 'image', durationMs: 8000 },
  { id: 'm2', mediaType: 'image', durationMs: 8000 },
  { id: 'm3', mediaType: 'video', mediaDurationMs: 10000, durationMs: 10000, trimStartMs: 1000, trimEndMs: 8000 },
];
assert('image1 = 8000', getSlideDurationMs(mixed[0]) === 8000);
assert('image2 = 8000', getSlideDurationMs(mixed[1]) === 8000);
assert('video trimmed = 7000', getSlideDurationMs(mixed[2]) === 7000);
assert('total = 8000+8000+7000 = 23000', getTotalSlidesDurationMs(mixed) === 23000);

console.log('\n=== Test 4: Render validation - slides < audio (NOW ALLOWED) ===');
const slidesShort = [{ id: 'x', mediaType: 'image', durationMs: 55000 }];
const r4 = validateTimeline(71000, 55000, slidesShort);
assert('slides(55s) < audio(71s) => allowed = true', r4.allowed === true);
assert('slides(55s) < audio(71s) => warning contains extend message', r4.message.includes('سيتم تمديد آخر شريحة'));

console.log('\n=== Test 5: Render validation - slides > audio ===');
const slidesLong = [
  { id: 'x', mediaType: 'image', durationMs: 45000 },
  { id: 'y', mediaType: 'image', durationMs: 45000 },
];
const r5 = validateTimeline(71000, 90000, slidesLong);
assert('slides(90s) > audio(71s) => allowed = true', r5.allowed === true);
assert('slides(90s) > audio(71s) => warning contains end at audio', r5.message.includes('سيتم إنهاء الفيديو عند نهاية الصوت'));

console.log('\n=== Test 6: Within tolerance (<=1000ms) ===');
const slidesClose = [{ id: 'x', mediaType: 'image', durationMs: 71020 }];
const r6 = validateTimeline(71000, 71020, slidesClose);
assert('diff(20ms) <= tolerance => allowed = true', r6.allowed === true);
assert('diff(20ms) <= tolerance => info about match', r6.message.includes('متطابقة تقريبًا'));

console.log('\n=== Test 7: No audio, slides = 40000ms ===');
const slidesNoAudio = [{ id: 'x', mediaType: 'image', durationMs: 40000 }];
const r7 = validateTimeline(0, 40000, slidesNoAudio);
assert('no audio => allowed = true', r7.allowed === true);
assert('finalDurationMs = 40000', getFinalDurationMs(0, 40000) === 40000);

console.log('\n=== Test 8: No slides => PREVENTED ===');
const r8 = validateTimeline(30000, 0, []);
assert('no slides => allowed = false', r8.allowed === false);
assert('no slides => level = error', r8.level === 'error');

console.log('\n=== Test 9: Total duration frames ===');
function getTotalDurationFrames(audioMs, slidesMs) {
  if (audioMs > 0) return Math.max(FPS, Math.round((audioMs / 1000) * FPS));
  return Math.max(FPS, Math.round((slidesMs / 1000) * FPS));
}
assert('audio 30s => 900 frames', getTotalDurationFrames(30000, 0) === 900);
assert('no audio, slides 10s => 300 frames', getTotalDurationFrames(0, 10000) === 300);
assert('min at least 30 frames', getTotalDurationFrames(0, 0) === 30);

console.log('\n=== Test 10: finalDurationMs logic ===');
assert('with audio => final = audio', getFinalDurationMs(71000, 55000) === 71000);
assert('without audio => final = slides', getFinalDurationMs(0, 40000) === 40000);

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===`);
process.exit(failed > 0 ? 1 : 0);
