const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const ApiError = require('../../utils/api-error');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./productController');
const { productSchema, updateProductSchema } = require('./productValidation');

const router = express.Router();
const upload = createUploadMiddleware('products');

// Multer error handler wrapper
const handleUpload = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        // Handle multer errors
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

router.get('/', optionalAuthMiddleware, getProducts);
router.get('/:id', optionalAuthMiddleware, getProduct);
router.post(
  '/',
  authMiddleware,
  handleUpload(upload.fields([{ name: 'img', maxCount: 1 }, { name: 'hoverImg', maxCount: 1 }])),
  validateRequest(productSchema),
  createProduct
);
router.put(
  '/:id',
  authMiddleware,
  handleUpload(upload.fields([{ name: 'img', maxCount: 1 }, { name: 'hoverImg', maxCount: 1 }])),
  validateRequest(updateProductSchema),
  updateProduct
);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
