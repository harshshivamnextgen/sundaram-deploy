const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('./blogController');
const { blogSchema, updateBlogSchema } = require('./blogValidation');

const router = express.Router();
const upload = createUploadMiddleware('blogs');

router.get('/', optionalAuthMiddleware, getBlogs);
router.get('/:id', optionalAuthMiddleware, getBlog);
router.post('/', authMiddleware, upload.single('image'), validateRequest(blogSchema), createBlog);
router.put('/:id', authMiddleware, upload.single('image'), validateRequest(updateBlogSchema), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
