const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rendererDir = path.join(root, 'desktop-v2', 'voiceover', 'renderer');
const indexHtml = fs.readFileSync(path.join(rendererDir, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(rendererDir, 'voiceover.js'), 'utf8');
const css = fs.readFileSync(path.join(rendererDir, 'voiceover.css'), 'utf8');

const checks = [];

function check(name, condition) {
  checks.push({ name, ok: Boolean(condition) });
}

check('index.html links extracted voiceover.css', indexHtml.includes('href="./voiceover.css"'));
check('index.html loads extracted voiceover.js', indexHtml.includes('src="./voiceover.js"'));
check('index.html has no inline style block', !/<style[\s>]/i.test(indexHtml));
check('index.html has no inline app script block', !/<script>\s*\/\/ /i.test(indexHtml));
check('brand logo has local fallback src', /id="brand-logo"[^>]+src="\.\.\/\.\.\/\.\.\/public\/assets\/logo\.png"/.test(indexHtml));
check('settings button is accessible', /id="settings-btn"[^>]+aria-label="الإعدادات"/.test(indexHtml));
check('settings modal markup exists', indexHtml.includes('id="settings-modal-overlay"'));
check('settings modal has API key input', indexHtml.includes('id="settings-api-key"'));
check('settings modal has save button', indexHtml.includes('id="settings-save-btn"'));
check('voiceover.js does not build voice cards with innerHTML', !appJs.includes('card.innerHTML'));
check('voiceover.js does not mutate buttons with innerHTML', !appJs.includes('btn.innerHTML') && !appJs.includes('generateBtn.innerHTML'));
check('voiceover.js guards desktop API calls', appJs.includes('function ensureDesktopApi()'));
check('voiceover.js loads saved settings', appJs.includes('window.desktopApi.getSettings()'));
check('voiceover.js saves settings', appJs.includes('window.desktopApi.saveSettings(nextSettings)'));
check('voiceover.js keeps 30 Gemini voices', (appJs.match(/name: '/g) || []).length === 30);
check('voiceover.css styles settings modal', css.includes('#settings-modal-overlay'));
check('voiceover.css includes compact responsive layout', css.includes('@media (max-width: 760px)'));

console.log('\n=== Voiceover Renderer Audit ===\n');
for (const item of checks) {
  console.log(`${item.ok ? '✓' : '✗'} ${item.name}`);
}

const failed = checks.filter((item) => !item.ok);
if (failed.length) {
  console.error(`\n${failed.length} checks failed`);
  process.exit(1);
}

console.log('\n✓ ALL CHECKS PASSED');
