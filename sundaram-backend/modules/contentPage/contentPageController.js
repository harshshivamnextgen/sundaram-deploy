const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse } = require('../../utils/api-response');
const contentPageService = require('./contentPageService');

const getPages = async (req, res, next) => {
  try {
    const pages = await contentPageService.listPages();
    return sendListResponse(res, pages, 200, 'Content pages retrieved');
  } catch (error) {
    return next(error);
  }
};

const getPage = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const page = await contentPageService.getPageBySlug(slug);
    if (!page) {
      return sendResponse(res, null, 200, 'Page not found');
    }
    return sendResponse(res, page, 200, 'Page retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createPage = async (req, res, next) => {
  try {
    const pageData = {
      ...req.body,
      ...(req.file ? { heroImage: `uploads/content-pages/${req.file.filename}` } : {}),
    };
    const page = await contentPageService.createPage(pageData);
    return sendResponse(res, page, 201, 'Page created successfully');
  } catch (error) {
    return next(error);
  }
};

const updatePage = async (req, res, next) => {
  try {
    const pageData = {
      ...req.body,
      ...(req.file ? { heroImage: `uploads/content-pages/${req.file.filename}` } : {}),
    };
    const page = await contentPageService.updatePageById(req.params.id, pageData);
    if (!page) {
      return sendResponse(res, null, 200, 'Page not found');
    }
    return sendResponse(res, page, 200, 'Page updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deletePage = async (req, res, next) => {
  try {
    const page = await contentPageService.deletePageById(req.params.id);
    if (!page) {
      return sendResponse(res, null, 200, 'Page not found');
    }
    return sendResponse(res, null, 200, 'Page deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
};
