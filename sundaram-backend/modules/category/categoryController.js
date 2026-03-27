const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const categoryService = require('./categoryService');

const getCategories = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { categories, total } = await categoryService.getCategoriesList({
      skip,
      limit,
      search,
      isAdmin: !!req.admin,
    });

    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, categories, 200, 'Categories retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id, !!req.admin);
    if (!category) {
      return sendResponse(res, null, 200, 'Category not found');
    }
    return sendResponse(res, category, 200, 'Category retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const existingCategory = await categoryService.findByName(req.body.name);
    if (existingCategory) {
      return next(new ApiError(400, 'Category already exists'));
    }

    const data = { ...req.body };
    if (req.file) {
      data.heroImage = `/uploads/categories/${req.file.filename}`;
    }

    const category = await categoryService.createNewCategory(data);
    return sendResponse(res, category, 201, 'Category created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.heroImage = `/uploads/categories/${req.file.filename}`;
    }

    const category = await categoryService.updateCategoryById(req.params.id, data);
    if (!category) {
      return next(new ApiError(404, 'Category not found'));
    }
    return sendResponse(res, category, 200, 'Category updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategoryById(req.params.id);
    if (!category) {
      return sendResponse(res, null, 200, 'Category not found');
    }
    return sendResponse(res, null, 200, 'Category deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
