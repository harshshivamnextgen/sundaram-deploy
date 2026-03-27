const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse } = require('../../utils/api-response');
const deliveryPlatformService = require('./deliveryPlatformService');

const getPlatforms = async (req, res, next) => {
  try {
    const isAdmin = !!req.admin;
    const search = (req.query.search || '').toString().trim();
    let platforms;

    if (isAdmin) {
      platforms = await deliveryPlatformService.getAllPlatformsWithSearch(search);
    } else {
      platforms = await deliveryPlatformService.listPlatforms();
    }
    return sendListResponse(res, platforms, 200, 'Delivery platforms retrieved');
  } catch (error) {
    return next(error);
  }
};

const getPlatform = async (req, res, next) => {
  try {
    const platform = await deliveryPlatformService.getPlatformById(req.params.id);
    if (!platform) {
      return sendResponse(res, null, 200, 'Delivery platform not found');
    }
    return sendResponse(res, platform, 200, 'Delivery platform retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createPlatform = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...(req.file ? { logo: `/uploads/delivery-platforms/${req.file.filename}` } : {}),
    };
    const platform = await deliveryPlatformService.createPlatform(data);
    return sendResponse(res, platform, 201, 'Delivery platform created successfully');
  } catch (error) {
    return next(error);
  }
};

const updatePlatform = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...(req.file ? { logo: `/uploads/delivery-platforms/${req.file.filename}` } : {}),
    };
    const platform = await deliveryPlatformService.updatePlatformById(req.params.id, data);
    if (!platform) {
      return sendResponse(res, null, 200, 'Delivery platform not found');
    }
    return sendResponse(res, platform, 200, 'Delivery platform updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deletePlatform = async (req, res, next) => {
  try {
    const platform = await deliveryPlatformService.deletePlatformById(req.params.id);
    if (!platform) {
      return sendResponse(res, null, 200, 'Delivery platform not found');
    }
    return sendResponse(res, null, 200, 'Delivery platform deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
