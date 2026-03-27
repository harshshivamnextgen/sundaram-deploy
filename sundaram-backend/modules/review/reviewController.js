const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const reviewService = require('./reviewService');

const getReviews = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { reviews, total } = await reviewService.getReviewsList({
      skip,
      limit,
      search,
      isAdmin: !!req.admin,
    });

    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, reviews, 200, 'Reviews retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id, !!req.admin);
    if (!review) {
      return sendResponse(res, null, 200, 'Review not found');
    }
    return sendResponse(res, review, 200, 'Review retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createNewReview(req.body);
    return sendResponse(res, review, 201, 'Review created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReviewById(req.params.id, req.body);
    if (!review) {
      return sendResponse(res, null, 200, 'Review not found');
    }
    return sendResponse(res, review, 200, 'Review updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await reviewService.deleteReviewById(req.params.id);
    if (!review) {
      return sendResponse(res, null, 200, 'Review not found');
    }
    return sendResponse(res, null, 200, 'Review deleted successfully');
  } catch (error) {
    return next(error);
  }
};

const getReviewStats = async (req, res, next) => {
  try {
    const result = await reviewService.getStats(!!req.admin);
    return sendResponse(res, result, 200, 'Review statistics retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getReviews,
  getReview,
  getReviewStats,
  createReview,
  updateReview,
  deleteReview,
};
