import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir, cp, readdir } from 'fs/promises';
import { bundle } from '@remotion/bundler';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const localAppData = process.env.LOCALAPPDATA || path.join(repoRoot, '.desktop-v2-build');
const outDir = path.join(localAppData, 'InfographicGeneratorDesktopV2BuildSizeLab', 'bundle-staging-qawaleb', 'remotion-bundle');

async function copyDirectory(sourceDir, targetDir) {
  await mkdir(targetDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else {
      await cp(sourcePath, targetPath, { force: true });
    }
  }
}

async function prepareQawalebPublicDir() {
  const stagedDir = path.join(repoRoot, 'cache', 'remotion-public-qawaleb');
  await fs.promises.rm(stagedDir, { recursive: true, force: true });
  await mkdir(stagedDir, { recursive: true });

  // Copy fonts only (not entire public/assets)
  const fontsDir = path.join(repoRoot, 'public', 'assets', 'fonts');
  const targetFontsDir = path.join(stagedDir, 'assets', 'fonts');
  if (fs.existsSync(fontsDir)) {
    await copyDirectory(fontsDir, targetFontsDir);
  }

  // Copy logo (referenced via staticFile('assets/logo.png'))
  const logoPath = path.join(repoRoot, 'public', 'assets', 'logo.png');
  const targetLogoDir = path.join(stagedDir, 'assets');
  if (fs.existsSync(logoPath)) {
    await mkdir(targetLogoDir, { recursive: true });
    await cp(logoPath, path.join(targetLogoDir, 'logo.png'), { force: true });
  }

  // Copy qawaleb background (referenced via staticFile('assets/qawaleb/backgrounds/rm380-05.jpg'))
  const qawalebBgDir = path.join(repoRoot, 'public', 'assets', 'qawaleb', 'backgrounds');
  const targetQawalebDir = path.join(stagedDir, 'assets', 'qawaleb', 'backgrounds');
  if (fs.existsSync(qawalebBgDir)) {
    await mkdir(targetQawalebDir, { recursive: true });
    const bgFiles = await readdir(qawalebBgDir);
    for (const file of bgFiles) {
      const src = path.join(qawalebBgDir, file);
      const dest = path.join(targetQawalebDir, file);
      if (fs.statSync(src).isFile()) {
        await cp(src, dest, { force: true });
      }
    }
  }

  return stagedDir;
}

await mkdir(path.dirname(outDir), { recursive: true });

const stagedPublicDir = await prepareQawalebPublicDir();

await bundle({
  entryPoint: path.join(repoRoot, 'src', 'remotion', 'qawaleb', 'index.ts'),
  outDir,
  enableCaching: true,
  publicDir: stagedPublicDir,
});

console.log(`Desktop V2 Qawaleb Remotion bundle ready at: ${outDir}`);
