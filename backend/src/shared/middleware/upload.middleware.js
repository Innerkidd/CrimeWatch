const { HTTP_STATUS, MAX_FILE_SIZES } = require('../constants');
const { sendError } = require('./response.helper');
const FileHelper = require('../utils/file.helper');

const multer = getMulterOrNull();

function getMulterOrNull() {
  try {
    return require('multer');
  } catch {
    return null;
  }
}

function createMemoryStorage() {
  const storage = {};
  return storage;
}

function uploadMiddleware(options = {}) {
  const fieldName = options.fieldName || 'file';
  const maxCount = options.maxCount || 1;
  const allowedTypes = options.allowedTypes || FileHelper.getAllowedMimeTypes();
  const maxSize = options.maxSize || MAX_FILE_SIZES.image;

  if (!multer) {
    return createMockUpload(fieldName, maxCount, allowedTypes, maxSize);
  }

  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: { fileSize: maxSize, files: maxCount },
    fileFilter: (_req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${file.mimetype} is not allowed`));
      }
    },
  });

  if (maxCount > 1) {
    return upload.array(fieldName, maxCount);
  }
  return upload.single(fieldName);
}

function createMockUpload(fieldName, maxCount, allowedTypes, maxSize) {
  return (req, _res, next) => {
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      return next();
    }
    const files = req.body?.[fieldName] || [];
    const fileArray = Array.isArray(files) ? files : [files];
    if (fileArray.length > maxCount) {
      return sendError(_res, HTTP_STATUS.BAD_REQUEST, `Maximum ${maxCount} files allowed`, 'ValidationError');
    }
    req.file = fileArray[0] || null;
    req.files = fileArray;
    next();
  };
}

function uploadCrimeImage() {
  return uploadMiddleware({
    fieldName: 'image',
    maxCount: 5,
    allowedTypes: FileHelper.getAllowedMimeTypes().filter((t) => t.startsWith('image/')),
    maxSize: MAX_FILE_SIZES.image,
  });
}

function uploadEvidence() {
  return uploadMiddleware({
    fieldName: 'evidence',
    maxCount: 10,
    allowedTypes: FileHelper.getAllowedMimeTypes(),
    maxSize: MAX_FILE_SIZES.video,
  });
}

function uploadProfileImage() {
  return uploadMiddleware({
    fieldName: 'avatar',
    maxCount: 1,
    allowedTypes: FileHelper.getAllowedMimeTypes().filter((t) => t.startsWith('image/')),
    maxSize: MAX_FILE_SIZES.image,
  });
}

const upload = Object.freeze({
  single: (fieldName, options) => uploadMiddleware({ ...options, fieldName, maxCount: 1 }),
  array: (fieldName, maxCount, options) => uploadMiddleware({ ...options, fieldName, maxCount }),
  crimeImage: uploadCrimeImage,
  evidence: uploadEvidence,
  profileImage: uploadProfileImage,
});

module.exports = { uploadMiddleware, upload, uploadCrimeImage, uploadEvidence, uploadProfileImage };
