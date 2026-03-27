const dayjs = require('dayjs');
const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const offerService = require('./offerService');

const buildActiveFlag = (offerData) => {
  if (!offerData.startDate || !offerData.endDate) {
    return offerData;
  }
  const now = dayjs();
  const active =
    now.isAfter(dayjs(offerData.startDate).subtract(1, 'minute')) &&
    now.isBefore(dayjs(offerData.endDate).add(1, 'minute'));
  return { ...offerData, isActive: active };
};

const getOffers = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const activeOffers = await offerService.getOffersList({ search });
    const total = activeOffers.length;
    const paginatedOffers = activeOffers.slice(skip, skip + limit);
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, paginatedOffers, 200, 'Offers retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getOffer = async (req, res, next) => {
  try {
    const offerWithActive = await offerService.getOfferById(req.params.id);
    if (!offerWithActive) {
      return sendResponse(res, null, 200, 'Offer not found');
    }
    return sendResponse(res, offerWithActive, 200, 'Offer retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createOffer = async (req, res, next) => {
  try {
    const payload = buildActiveFlag({
      ...req.body,
      bannerImage: req.file ? `uploads/offers/${req.file.filename}` : undefined,
    });
    const offer = await offerService.createNewOffer(payload);
    return sendResponse(res, offer, 201, 'Offer created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateOffer = async (req, res, next) => {
  try {
    const payload = buildActiveFlag({
      ...req.body,
      ...(req.file ? { bannerImage: `uploads/offers/${req.file.filename}` } : {}),
    });

    const offer = await offerService.updateOfferById(req.params.id, payload);
    if (!offer) {
      return sendResponse(res, null, 200, 'Offer not found');
    }
    return sendResponse(res, offer, 200, 'Offer updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteOffer = async (req, res, next) => {
  try {
    const offer = await offerService.deleteOfferById(req.params.id);
    if (!offer) {
      return sendResponse(res, null, 200, 'Offer not found');
    }
    return sendResponse(res, null, 200, 'Offer deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
