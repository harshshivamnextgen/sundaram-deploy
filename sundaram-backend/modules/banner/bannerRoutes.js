const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const ApiError = require('../../utils/api-error');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('./bannerController');
const { bannerSchema, updateBannerSchema } = require('./bannerValidation');

const router = express.Router();
const upload = createUploadMiddleware('banners');

// Multer error handler wrapper for multiple fields
const handleUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File size exceeds 5MB limit'));
        }
        if (err.code === 'ENOENT') {
          return next(new ApiError(500, 'Upload directory error. Please contact administrator.'));
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

// Public: list banners (with search, pageKey, position, etc.)
router.get('/', optionalAuthMiddleware, getBanners);
// Public: single banner by id
router.get('/:id', optionalAuthMiddleware, getBanner);

// Admin: create banner (supports desktop + mobile image)
router.post(
  '/',
  authMiddleware,
  handleUpload(
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ])
  ),
  validateRequest(bannerSchema),
  createBanner
);

// Admin: update banner
router.put(
  '/:id',
  authMiddleware,
  handleUpload(
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ])
  ),
  validateRequest(updateBannerSchema),
  updateBanner
);

// Admin: delete banner
router.delete('/:id', authMiddleware, deleteBanner);

module.exports = router;
