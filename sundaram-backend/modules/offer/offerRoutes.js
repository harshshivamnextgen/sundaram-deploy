const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const { createUploadMiddleware } = require('../../middlewares/upload.middleware');
const {
  getOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
} = require('./offerController');
const { offerSchema, updateOfferSchema } = require('./offerValidation');

const router = express.Router();
const upload = createUploadMiddleware('offers');

router.get('/', optionalAuthMiddleware, getOffers);
router.get('/:id', optionalAuthMiddleware, getOffer);
router.post('/', authMiddleware, upload.single('bannerImage'), validateRequest(offerSchema), createOffer);
router.put('/:id', authMiddleware, upload.single('bannerImage'), validateRequest(updateOfferSchema), updateOffer);
router.delete('/:id', authMiddleware, deleteOffer);

module.exports = router;
