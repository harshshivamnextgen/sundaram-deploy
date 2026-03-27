const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const ApiError = require('../../utils/api-error');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./categoryController');
const { categorySchema, updateCategorySchema } = require('./categoryValidation');

const router = express.Router();
const upload = createUploadMiddleware('categories');

// Multer error handler wrapper
const handleUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File size exceeds 5MB limit'));
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

router.get('/', optionalAuthMiddleware, getCategories);
router.get('/:id', optionalAuthMiddleware, getCategory);
router.post(
  '/',
  authMiddleware,
  handleUpload(upload.single('heroImage')),
  validateRequest(categorySchema),
  createCategory
);
router.put(
  '/:id',
  authMiddleware,
  handleUpload(upload.single('heroImage')),
  validateRequest(updateCategorySchema),
  updateCategory
);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
