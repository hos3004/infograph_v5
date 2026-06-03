import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const entryFile = path.join(repoRoot, 'desktop-v2', 'mutabaat', 'preview', 'player-entry.tsx');
const outDir = path.join(repoRoot, 'desktop-v2', 'mutabaat', 'renderer', 'generated');
const outFile = path.join(outDir, 'preview-player-mutabaat.js');

await esbuild.build({
  entryPoints: [entryFile],
  outfile: outFile,
  bundle: true,
  format: 'iife',
  globalName: 'DesktopRemotionPreviewMutabaatBundle',
  platform: 'browser',
  jsx: 'automatic',
  sourcemap: false,
  logLevel: 'warning',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

console.log(`Mutabaat preview player built at: ${outFile}`);

