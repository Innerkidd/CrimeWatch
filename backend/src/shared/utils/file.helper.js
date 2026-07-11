const { ALLOWED_MIME_TYPES, MAX_FILE_SIZES } = require('../constants');
const crypto = require('crypto');

function getAllowedMimeTypes() {
  const all = [];
  Object.values(ALLOWED_MIME_TYPES).forEach((types) => all.push(...types));
  return all;
}

function getFileType(mimeType) {
  for (const [type, mimes] of Object.entries(ALLOWED_MIME_TYPES)) {
    if (mimes.includes(mimeType)) return type;
  }
  return null;
}

function validateFile(mimeType, size) {
  const errors = [];
  const fileType = getFileType(mimeType);
  if (!fileType) {
    errors.push(`File type ${mimeType} is not allowed. Allowed: ${getAllowedMimeTypes().join(', ')}`);
    return { valid: false, errors, fileType: null };
  }
  const maxSize = MAX_FILE_SIZES[fileType];
  if (size > maxSize) {
    const mb = (maxSize / (1024 * 1024)).toFixed(0);
    errors.push(`File size exceeds ${mb}MB limit for ${fileType} files`);
  }
  return { valid: errors.length === 0, errors, fileType };
}

function validateFiles(files, fieldName, maxCount = 5) {
  const errors = [];
  if (!files || !files[fieldName]) {
    errors.push(`No files uploaded for field "${fieldName}"`);
    return { valid: false, errors };
  }
  const fileArray = Array.isArray(files[fieldName]) ? files[fieldName] : [files[fieldName]];
  if (fileArray.length > maxCount) {
    errors.push(`Maximum ${maxCount} files allowed for "${fieldName}"`);
    return { valid: false, errors };
  }
  for (const file of fileArray) {
    const result = validateFile(file.mimetype, file.size);
    if (!result.valid) errors.push(...result.errors);
  }
  return { valid: errors.length === 0, errors };
}

function generateFileName(originalName) {
  const ext = originalName.split('.').pop();
  const hash = crypto.randomBytes(8).toString('hex');
  const timestamp = Date.now();
  return `${timestamp}-${hash}.${ext}`;
}

function getExtension(filename) {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function isImage(mimeType) {
  return ALLOWED_MIME_TYPES.images.includes(mimeType);
}

function isDocument(mimeType) {
  return ALLOWED_MIME_TYPES.documents.includes(mimeType);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

const FileHelper = {
  getAllowedMimeTypes,
  getFileType,
  validateFile,
  validateFiles,
  generateFileName,
  getExtension,
  isImage,
  isDocument,
  formatFileSize,
};

module.exports = FileHelper;
