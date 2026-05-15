const os = require('os');
const path = require('path');

const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
const buildRoot = path.join(localAppData, 'InfographicGeneratorDesktopV2BuildSizeLab');
const bundleStagingDir = path.join(buildRoot, 'bundle-staging', 'remotion-bundle');
const motadawelBundleStagingDir = path.join(buildRoot, 'bundle-staging-motadawel', 'remotion-bundle');
const laqtatBundleStagingDir = path.join(buildRoot, 'bundle-staging-laqtat', 'remotion-bundle');
const sowarBundleStagingDir = path.join(buildRoot, 'bundle-staging-sowar', 'remotion-bundle');
const personalitiesBundleStagingDir = path.join(buildRoot, 'bundle-staging-personalities', 'remotion-bundle');
const qawalebBundleStagingDir = path.join(buildRoot, 'bundle-staging-qawaleb', 'remotion-bundle');
const outputDir = process.env.DESKTOP_V2_BUILD_DIR || path.join(buildRoot, 'dist');

module.exports = {
  appId: 'com.infograph.generator.desktopv2',
  productName: 'Infographic Generator',
  directories: {
    output: outputDir,
  },
  files: [
    'desktop-v2/main.cjs',
    'desktop-v2/preload.cjs',
    'desktop-v2/renderer/**/*',
    'desktop-v2/worker/**/*',
    'desktop-v2/shared/**/*',
    'desktop-v2/motadawel/**/*',
    'desktop-v2/laqtat/**/*',
    'desktop-v2/sowar/**/*',
    'desktop-v2/qawaleb/**/*',
    'desktop-v2/personalities/**/*',
    'desktop-v2/updater/**/*',
    'package.json',
    '!**/*.map',
    '!**/*.ts.map',
    '!**/*.js.map',
    '!**/*.bak',
    '!**/*.bak-*',
    '!**/*.bak.*',
    '!**/README*',
    '!**/*.md',
    '!**/*.ts',
    '!**/*.tsx',
    '!**/docs/**',
    '!**/test/**',
    '!**/tests/**',
    '!**/screenshots/**',
    '!**/*.zip',
    '!**/*.rar',
    '!**/*.7z',
    '!node_modules/ffprobe-static/bin/darwin/**/*',
    '!node_modules/ffprobe-static/bin/linux/**/*',
    '!node_modules/ffprobe-static/bin/win32/ia32/**/*',
  ],
  extraMetadata: {
    main: 'desktop-v2/main.cjs',
  },
  extraResources: [
    {
      from: bundleStagingDir,
      to: 'desktop-v2/generated/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
    {
      from: motadawelBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-motadawel/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
    {
      from: laqtatBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-laqtat/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
    {
      from: sowarBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-sowar/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
    {
      from: personalitiesBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-personalities/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
    {
      from: qawalebBundleStagingDir,
      to: 'desktop-v2/generated/bundle-staging-qawaleb/remotion-bundle',
      filter: ['**/*', '!**/*.map'],
    },
  ],
  extraFiles: [
    {
      from: 'public/assets',
      to: 'Assets',
    },
  ],
  asarUnpack: [
    'node_modules/@remotion/compositor-win32-x64-msvc/**/*',
    'node_modules/ffmpeg-static/**/*',
    'node_modules/ffprobe-static/bin/win32/x64/**/*',
    'node_modules/ffprobe-static/index.js',
    'node_modules/ffprobe-static/package.json',
  ],
  npmRebuild: false,
  publish: {
    provider: 'generic',
    url: 'http://127.0.0.1:8089/core-updates/',
  },
  win: {
    target: [
      { target: 'nsis', arch: ['x64'] },
      { target: 'dir', arch: ['x64'] },
    ],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    perMachine: false,
    createDesktopShortcut: true,
    artifactName: '${productName}-Setup-${version}.${ext}',
  },
};
