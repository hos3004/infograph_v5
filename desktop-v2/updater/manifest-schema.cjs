const MANIFEST_VERSION = 1;

const MANIFEST_FILE_KEYS = ['category', 'path', 'url', 'sha256', 'size', 'restartRequired'];
const ALLOWED_CATEGORIES = ['prompt-template', 'asset', 'bundle', 'preset', 'config', 'preview-player', 'template-html'];

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== 'object') {
    return { valid: false, error: 'Manifest must be an object' };
  }
  if (manifest.manifestVersion !== MANIFEST_VERSION) {
    return { valid: false, error: `Unsupported manifest version: ${manifest.manifestVersion}` };
  }
  if (!Array.isArray(manifest.files)) {
    return { valid: false, error: 'Manifest must contain a files array' };
  }
  if (typeof manifest.appMinVersion !== 'string') {
    return { valid: false, error: 'appMinVersion is required' };
  }
  for (const f of manifest.files) {
    if (!f.path || !f.url || !f.sha256) {
      return { valid: false, error: `Each file entry must have path, url, sha256. Got: ${JSON.stringify(f)}` };
    }
    if (f.category && !ALLOWED_CATEGORIES.includes(f.category)) {
      return { valid: false, error: `Unsupported category: ${f.category}` };
    }
  }
  return { valid: true };
}

module.exports = { validateManifest, MANIFEST_VERSION, ALLOWED_CATEGORIES };
