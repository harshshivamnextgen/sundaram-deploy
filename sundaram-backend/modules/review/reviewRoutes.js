const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const {
  getReviews,
  getReview,
  getReviewStats,
  createReview,
  updateReview,
  deleteReview,
} = require('./reviewController');
const { reviewSchema, updateReviewSchema } = require('./reviewValidation');

const router = express.Router();

router.get('/', optionalAuthMiddleware, getReviews);
router.get('/stats', optionalAuthMiddleware, getReviewStats);
router.get('/:id', optionalAuthMiddleware, getReview);
router.post('/', authMiddleware, validateRequest(reviewSchema), createReview);
router.put('/:id', authMiddleware, validateRequest(updateReviewSchema), updateReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
