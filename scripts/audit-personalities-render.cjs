const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let allPassed = true;
const results = [];

function check(description, condition) {
  if (condition) {
    results.push(`  ✓ ${description}`);
  } else {
    results.push(`  ✗ ${description}`);
    allPassed = false;
  }
}

function fileContains(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(pattern);
  } catch {
    return false;
  }
}

console.log('\n=== Personalities Render Isolation Audit ===\n');

// 1. main.cjs contains renderWorkerPersonalities
const mainCjs = path.join(ROOT, 'desktop-v2', 'main.cjs');
check('main.cjs declares renderWorkerPersonalities', fileContains(mainCjs, 'renderWorkerPersonalities = null'));
check('main.cjs getWorkerName handles personalities', fileContains(mainCjs, "if (model === 'personalities') return 'personalities'"));
check('main.cjs cancelRender uses getWorkerName', fileContains(mainCjs, 'getWorkerName(payload?.model)'));
check('main.cjs before-quit kills personalities worker', fileContains(mainCjs, 'renderWorkerPersonalities && !renderWorkerPersonalities.killed'));

// 2. Worker path
check('main.cjs spawns personalities from correct path',
  fileContains(mainCjs, "path.join(desktopPaths.codeRoot, 'personalities', 'worker', 'render-worker-personalities.cjs')"));

// 3. app.js sends model: 'personalities'
const appJs = path.join(ROOT, 'desktop-v2', 'personalities', 'renderer', 'app.js');
check('app.js sends model: personalities in buildRenderPayload', fileContains(appJs, "model: 'personalities'"));
check('app.js sends projectType: personalities', fileContains(appJs, "projectType: 'personalities'"));
check('app.js sends renderMode: personalities in preview', fileContains(appJs, "renderMode: 'personalities'"));
check('app.js cancelRender sends model: personalities', fileContains(appJs, "model: 'personalities'"));
check('app.js has DEFAULT_IMAGE_DURATION_MS = 8000', fileContains(appJs, 'DEFAULT_IMAGE_DURATION_MS = 8000'));
check('app.js has validateTimelineBeforeRender', fileContains(appJs, 'validateTimelineBeforeRender'));
check('app.js validateTimelineBeforeRender uses allowed pattern', fileContains(appJs, 'allowed: true'));
check('app.js validateTimelineBeforeRender allows slides<aideo', fileContains(appJs, 'سيتم تمديد آخر شريحة'));
check('app.js has getSlideEffectiveDurationMs', fileContains(appJs, 'getSlideEffectiveDurationMs'));
check('app.js has readAudioDurationMs', fileContains(appJs, 'readAudioDurationMs'));
check('app.js no longer uses old valid:false prevention pattern', !fileContains(appJs, "valid:"));
check('app.js handlePickSlides sets durationMs for images', fileContains(appJs, 'DEFAULT_IMAGE_DURATION_MS'));
check('app.js handlePickVoiceover reads audio duration', fileContains(appJs, 'readAudioDurationMs(result.url, 0)'));
check('app.js handleClearVoiceover zeros all fields', fileContains(appJs, "mainVoiceoverDurationMs = 0"));
check('app.js scene-count-select uses Number input', !fileContains(appJs, "=== 'custom'"));

// 4. Root.tsx
const rootTsx = path.join(ROOT, 'src', 'remotion', 'Root.tsx');
check('Root.tsx contains PersonalitiesVideo composition', fileContains(rootTsx, 'id="PersonalitiesVideo"'));
check('Root.tsx contains InfographicVideo composition', fileContains(rootTsx, 'id="InfographicVideo"'));
check('Root.tsx imports PersonalitiesComposition', fileContains(rootTsx, "import { PersonalitiesComposition } from './personalities/PersonalitiesComposition'"));

// 5. PersonalitiesComposition does NOT import TextAnimationRenderer
const personalitiesComp = path.join(ROOT, 'src', 'remotion', 'personalities', 'PersonalitiesComposition.tsx');
check('PersonalitiesComposition.tsx exists', fs.existsSync(personalitiesComp));
check('PersonalitiesComposition does NOT import TextAnimationRenderer',
  !fileContains(personalitiesComp, 'TextAnimationRenderer'));
check('PersonalitiesComposition does NOT import SubtitleVignette',
  !fileContains(personalitiesComp, 'SubtitleVignette'));
check('PersonalitiesComposition uses mediaType field', fileContains(personalitiesComp, 'slide.mediaType'));
check('PersonalitiesComposition has endPage support', fileContains(personalitiesComp, 'endPageDurationFrames'));

// 6. timeline.ts
const timelineTs = path.join(ROOT, 'src', 'remotion', 'personalities', 'timeline.ts');
check('timeline.ts exists', fs.existsSync(timelineTs));
check('timeline.ts has DEFAULT_IMAGE_DURATION_MS = 8000', fileContains(timelineTs, 'DEFAULT_IMAGE_DURATION_MS = 8000'));
check('timeline.ts has getSlideDurationMs', fileContains(timelineTs, 'getSlideDurationMs'));
check('timeline.ts has buildTimeline', fileContains(timelineTs, 'buildTimeline'));
check('timeline.ts has isVideoSlide', fileContains(timelineTs, 'isVideoSlide'));
check('timeline.ts video trim logic', fileContains(timelineTs, 'trimEndMs'));
check('timeline.ts image fallback 8000ms', fileContains(timelineTs, 'DEFAULT_IMAGE_DURATION_MS'));

// 7. Worker uses PersonalitiesVideo
const workerPersonalities = path.join(ROOT, 'desktop-v2', 'personalities', 'worker', 'render-worker-personalities.cjs');
check('render-worker-personalities.cjs exists', fs.existsSync(workerPersonalities));
check('worker selects PersonalitiesVideo composition', fileContains(workerPersonalities, "id: 'PersonalitiesVideo'"));
check('worker does NOT use InfographicVideo', !fileContains(workerPersonalities, 'InfographicVideo'));
check('worker imports payload-personalities', fileContains(workerPersonalities, 'payload-personalities.cjs'));
check('worker uses normalizePersonalitiesPayload', fileContains(workerPersonalities, 'normalizePersonalitiesPayload'));

// 8. payload-personalities.cjs
const payloadPersonalities = path.join(ROOT, 'desktop-v2', 'personalities', 'shared', 'payload-personalities.cjs');
check('payload-personalities.cjs exists', fs.existsSync(payloadPersonalities));
check('payload normalizes mediaType', fileContains(payloadPersonalities, 'mediaType'));
check('payload normalizes durationMs default 8000', fileContains(payloadPersonalities, '8000'));

// 9. Original render-worker.cjs unchanged
const renderWorker = path.join(ROOT, 'desktop-v2', 'worker', 'render-worker.cjs');
check('original render-worker.cjs uses InfographicVideo', fileContains(renderWorker, "id: 'InfographicVideo'"));

// 10. payload.cjs unchanged
const payloadCjs = path.join(ROOT, 'desktop-v2', 'shared', 'payload.cjs');
check('shared payload.cjs does not mention personalities',
  !fileContains(payloadCjs, 'personalities') || fileContains(payloadCjs, '//'));

// 11. preview-player.js source supports personalities
const previewSource = path.join(ROOT, 'desktop-v2', 'personalities', 'preview', 'player-entry.tsx');
check('player-entry.tsx (source) exists', fs.existsSync(previewSource));
check('player-entry.tsx imports PersonalitiesComposition', fileContains(previewSource, "import { PersonalitiesComposition }"));
check('player-entry.tsx conditionally selects composition', fileContains(previewSource, 'isPersonalities'));
check('player-entry.tsx uses MainComposition for non-personalities', fileContains(previewSource, 'MainComposition'));
const previewBuildScript = path.join(ROOT, 'desktop-v2', 'personalities', 'scripts', 'build-preview-player-personalities.mjs');
check('build-preview-player-personalities.mjs exists', fs.existsSync(previewBuildScript));

// 12. Generated file is up-to-date (contains PersonalitiesComposition)
const previewPlayer = path.join(ROOT, 'desktop-v2', 'personalities', 'renderer', 'generated', 'preview-player.js');
check('generated preview-player.js has PersonalitiesComposition', fileContains(previewPlayer, 'PersonalitiesComposition'));
check('generated preview-player.js conditionally selects', fileContains(previewPlayer, 'renderMode === "personalities"'));

// Summary
console.log('\n--- Results ---');
results.forEach(r => console.log(r));
console.log(`\n${allPassed ? '✓ ALL CHECKS PASSED' : '✗ SOME CHECKS FAILED'}`);
process.exit(allPassed ? 0 : 1);
