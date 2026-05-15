import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';
import { bundle } from '@remotion/bundler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const localAppData = process.env.LOCALAPPDATA || path.join(repoRoot, '.desktop-v2-build');
const outDir = path.join(localAppData, 'InfographicGeneratorDesktopV2Build', 'bundle-staging-qawaleb', 'remotion-bundle');

await mkdir(path.dirname(outDir), { recursive: true });

await bundle({
  entryPoint: path.join(repoRoot, 'src', 'remotion', 'qawaleb', 'index.ts'),
  outDir,
  enableCaching: true,
  publicDir: path.join(repoRoot, 'public'),
});

console.log(`Desktop V2 Qawaleb Remotion bundle ready at: ${outDir}`);
