const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
} = require('./contentPageController');
const { contentPageSchema, updateContentPageSchema } = require('./contentPageValidation');

const router = express.Router();

router.get('/', optionalAuthMiddleware, getPages);
router.get('/:slug', optionalAuthMiddleware, getPage);
router.post('/', authMiddleware, validateRequest(contentPageSchema), createPage);
router.put('/:id', authMiddleware, validateRequest(updateContentPageSchema), updatePage);
router.delete('/:id', authMiddleware, deletePage);

module.exports = router;
