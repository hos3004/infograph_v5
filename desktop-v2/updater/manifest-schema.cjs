const MANIFEST_VERSION = 1;
const SUPPORTED_MANIFEST_VERSIONS = [1];
const ALLOWED_CATEGORIES = ['prompt-template', 'asset', 'bundle', 'preset', 'config', 'preview-player', 'template-html'];

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    return { valid: false, error: 'manifest must be a JSON object' };
  }
  if (typeof manifest.manifestVersion !== 'number' || !SUPPORTED_MANIFEST_VERSIONS.includes(manifest.manifestVersion)) {
    return { valid: false, error: `Unsupported manifest version: ${manifest.manifestVersion}. Supported: ${SUPPORTED_MANIFEST_VERSIONS.join(', ')}` };
  }
  if (!manifest.updateId || typeof manifest.updateId !== 'string') {
    return { valid: false, error: 'manifest must have a string updateId' };
  }
  if (!Array.isArray(manifest.files)) {
    return { valid: false, error: 'manifest must contain a files array' };
  }
  if (typeof manifest.appMinVersion !== 'string' || !manifest.appMinVersion.trim()) {
    return { valid: false, error: 'appMinVersion is required and must be a non-empty string' };
  }
  for (let i = 0; i < manifest.files.length; i++) {
    const f = manifest.files[i];
    if (!f || typeof f !== 'object') {
      return { valid: false, error: `files[${i}] must be an object` };
    }
    if (!f.path || typeof f.path !== 'string') {
      return { valid: false, error: `files[${i}] must have a string path` };
    }
    if (!f.url || typeof f.url !== 'string') {
      return { valid: false, error: `files[${i}] must have a string url` };
    }
    if (!f.sha256 || typeof f.sha256 !== 'string' || !/^[a-f0-9]{64}$/i.test(f.sha256)) {
      return { valid: false, error: `files[${i}] must have a valid sha256 (64 hex chars)` };
    }
    if (f.category && !ALLOWED_CATEGORIES.includes(f.category)) {
      return { valid: false, error: `files[${i}] has unsupported category: "${f.category}". Allowed: ${ALLOWED_CATEGORIES.join(', ')}` };
    }
  }
  return { valid: true };
}

module.exports = { validateManifest, MANIFEST_VERSION, ALLOWED_CATEGORIES };
