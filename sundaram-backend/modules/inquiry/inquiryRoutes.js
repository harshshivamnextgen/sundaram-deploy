const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiryStatus,
  replyToInquiry,
} = require('./inquiryController');
const { inquirySchema, statusSchema, replySchema } = require('./inquiryValidation');

const router = express.Router();

router.post('/', validateRequest(inquirySchema), createInquiry);
router.get('/', authMiddleware, getInquiries);
router.get('/:id', authMiddleware, getInquiry);
router.patch('/:id/status', authMiddleware, validateRequest(statusSchema), updateInquiryStatus);
router.post('/:id/reply', authMiddleware, validateRequest(replySchema), replyToInquiry);

module.exports = router;
