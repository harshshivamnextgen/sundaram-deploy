const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const ApiError = require('../../utils/api-error');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require('./deliveryPlatformController');
const { deliveryPlatformSchema, updateDeliveryPlatformSchema } = require('./deliveryPlatformValidation');

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

router.get('/', optionalAuthMiddleware, getPlatforms);
router.get('/:id', optionalAuthMiddleware, getPlatform);
router.post(
  '/',
  authMiddleware,
  handleUpload(upload.single('icon')),
  validateRequest(deliveryPlatformSchema),
  createPlatform
);
router.put(
  '/:id',
  authMiddleware,
  handleUpload(upload.single('icon')),
  validateRequest(updateDeliveryPlatformSchema),
  updatePlatform
);
router.delete('/:id', authMiddleware, deletePlatform);

module.exports = router;
