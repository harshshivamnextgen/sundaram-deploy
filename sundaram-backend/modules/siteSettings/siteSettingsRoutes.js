const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const ApiError = require('../../utils/api-error');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getPublicSiteSettings,
  getAdminSiteSettings,
  updateSiteSettings,
} = require('./siteSettingsController');
const { updateSiteSettingsSchema } = require('./siteSettingsValidation');

const router = express.Router();
const upload = createUploadMiddleware('branding');

// Multer error handler wrapper
const handleUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File size exceeds 5MB limit'));
        }
        if (err.code === 'ENOENT') {
          return next(
            new ApiError(500, 'Upload directory error. Please contact administrator.')
          );
        }
        if (err.message && err.message.includes('Only jpg, png, and webp')) {
          return next(new ApiError(400, 'Only jpg, png, and webp images are allowed'));
        }
        return next(new ApiError(400, err.message || 'File upload error'));
      }
      next();
    });
  };
};

// Middleware to organize uploaded files and parse socialMedia JSON
const organizeUploadedFiles = (req, _res, next) => {
  try {
    const organizedFiles = {
      logo: null,
      favicon: null,
      socialMediaIcons: {},
    };

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file) => {
        if (file.fieldname === 'logo') {
          organizedFiles.logo = file;
        } else if (file.fieldname === 'favicon') {
          organizedFiles.favicon = file;
        } else if (file.fieldname.startsWith('socialMediaIcon_')) {
          const index = parseInt(file.fieldname.replace('socialMediaIcon_', ''), 10);
          if (!isNaN(index)) {
            organizedFiles.socialMediaIcons[index] = file;
          }
        }
      });
    }

    req.organizedFiles = organizedFiles;

    if (req.body.socialMedia && typeof req.body.socialMedia === 'string') {
      try {
        req.body.socialMedia = JSON.parse(req.body.socialMedia);
      } catch (parseError) {
        return next(new ApiError(400, 'Invalid socialMedia JSON format'));
      }
    }
    next();
  } catch (error) {
    return next(new ApiError(500, 'Error processing uploaded files'));
  }
};

router.get('/', getPublicSiteSettings);
router.get('/admin', authMiddleware, getAdminSiteSettings);
router.put(
  '/admin',
  authMiddleware,
  handleUpload(upload.any()),
  organizeUploadedFiles,
  validateRequest(updateSiteSettingsSchema),
  updateSiteSettings
);

module.exports = router;
