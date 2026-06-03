import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { prepareRemotionPublicDir } from '../../shared/remotion-public.cjs';
import { createDesktopPaths, ensureDesktopDirs } from '../../shared/paths.cjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const buildRoot = path.join(process.env.LOCALAPPDATA || os.tmpdir(), 'InfographicGeneratorDesktopV2BuildSizeLab');
const outDir = process.env.DESKTOP_V2_BUNDLE_OUT_DIR_MUTABAAT || path.join(buildRoot, 'bundle-staging-mutabaat', 'remotion-bundle');

const desktopPaths = createDesktopPaths({
  packaged: false,
  appHome: path.join(process.env.LOCALAPPDATA || process.cwd(), 'InfographicGeneratorDesktopV2Dev'),
});

ensureDesktopDirs(desktopPaths);

const stagedPublicDir = await prepareRemotionPublicDir(desktopPaths);

await bundle({
  entryPoint: path.join(repoRoot, 'src', 'remotion', 'mutabaat', 'index.ts'),
  outDir,
  enableCaching: true,
  publicDir: stagedPublicDir,
});

console.log(`Mutabaat Remotion bundle built at: ${outDir}`);

