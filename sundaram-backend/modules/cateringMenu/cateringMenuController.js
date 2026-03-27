const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const cateringMenuService = require('./cateringMenuService');

const getMenus = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { menus, total } = await cateringMenuService.getMenusList({ skip, limit, search });
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, menus, 200, 'Catering menus retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const menu = await cateringMenuService.getMenuById(req.params.id);
    if (!menu) {
      return sendResponse(res, null, 200, 'Catering menu not found');
    }
    return sendResponse(res, menu, 200, 'Catering menu retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createMenu = async (req, res, next) => {
  try {
    const menu = await cateringMenuService.createNewMenu(req.body);
    return sendResponse(res, menu, 201, 'Catering menu created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const menu = await cateringMenuService.updateMenuById(req.params.id, req.body);
    if (!menu) {
      return sendResponse(res, null, 200, 'Catering menu not found');
    }
    return sendResponse(res, menu, 200, 'Catering menu updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const menu = await cateringMenuService.deleteMenuById(req.params.id);
    if (!menu) {
      return sendResponse(res, null, 200, 'Catering menu not found');
    }
    return sendResponse(res, null, 200, 'Catering menu deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};
