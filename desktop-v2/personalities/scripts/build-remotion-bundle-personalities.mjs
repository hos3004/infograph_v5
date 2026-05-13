import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir, cp } from 'fs/promises';
import os from 'os';

// Personalities currently reuses the Infograph Remotion composition and bundle.
// This script mirrors the existing Infograph bundle into a personalities staging
// folder only for packaging consistency. It does not create a separate composition.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
const buildRoot = path.join(localAppData, 'InfographicGeneratorDesktopV2Build');
const sourceDir = path.join(buildRoot, 'bundle-staging', 'remotion-bundle');
const outDir = process.env.DESKTOP_V2_PERSONALITIES_BUNDLE_OUT_DIR || path.join(buildRoot, 'bundle-staging-personalities', 'remotion-bundle');

await mkdir(outDir, { recursive: true });
try {
  await cp(sourceDir, outDir, { recursive: true, force: true });
  console.log('Personalities bundle mirror ready at:', outDir);
} catch (error) {
  console.warn('Personalities bundle mirror skipped; build the main Infograph bundle first.', error?.message || error);
}
