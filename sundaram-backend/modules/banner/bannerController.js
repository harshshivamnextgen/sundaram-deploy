const dayjs = require('dayjs');
const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const bannerService = require('./bannerService');

/**
 * Public + Admin: List banners with pagination, search, and filtering
 */
const getBanners = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const filters = {
      page,
      limit,
      skip,
      search: (req.query.search || '').toString().trim(),
      type: (req.query.type || '').toString().trim().toLowerCase(),
      pageKey: (req.query.pageKey || '').toString().trim().toLowerCase(),
      position: (req.query.position || '').toString().trim(),
      activeOnly: (req.query.activeOnly || 'true').toString().toLowerCase() !== 'false',
    };

    const { banners, total } = await bannerService.getBannersList(filters);
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, banners, 200, 'Banners retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getBanner = async (req, res, next) => {
  try {
    const banner = await bannerService.getBannerById(req.params.id);
    if (!banner) {
      return sendResponse(res, null, 200, 'Banner not found');
    }
    return sendResponse(res, banner, 200, 'Banner retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createBanner = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.files?.image?.[0]) {
      payload.image = `uploads/banners/${req.files.image[0].filename}`;
    }

    if (req.files?.mobileImage?.[0]) {
      payload.mobileImage = `uploads/banners/${req.files.mobileImage[0].filename}`;
    }

    const banner = await bannerService.createNewBanner(payload);
    return sendResponse(res, banner, 201, 'Banner created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateBanner = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.files?.image?.[0]) {
      payload.image = `uploads/banners/${req.files.image[0].filename}`;
    }

    if (req.files?.mobileImage?.[0]) {
      payload.mobileImage = `uploads/banners/${req.files.mobileImage[0].filename}`;
    }

    const banner = await bannerService.updateBannerById(req.params.id, payload);

    if (!banner) {
      return sendResponse(res, null, 200, 'Banner not found');
    }

    return sendResponse(res, banner, 200, 'Banner updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const banner = await bannerService.deleteBannerById(req.params.id);
    if (!banner) {
      return sendResponse(res, null, 200, 'Banner not found');
    }
    return sendResponse(res, null, 200, 'Banner deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
};
