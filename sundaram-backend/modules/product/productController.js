const mongoose = require('mongoose');
const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const productService = require('./productService');

const constructImagePath = (file, folder) => (file ? [`uploads/${folder}/${file.filename}`] : []);

const getProducts = async (req, res, next) => {
  try {
    const search = (req.query.search || '').toString().trim();
    const categoryId = (req.query.category || req.query.categoryId || '').toString().trim();
    const hasPagination = req.query.page !== undefined && req.query.page !== null && req.query.page !== '';

    // Jewelry filters
    const type = (req.query.type || '').toString().trim();
    const shape = (req.query.shape || '').toString().trim();
    const occasion = (req.query.occasion || '').toString().trim();
    const carat = (req.query.carat || '').toString().trim();
    const style = (req.query.style || '').toString().trim();
    const metal = (req.query.metal || '').toString().trim();
    const gender = (req.query.gender || '').toString().trim();

    // Admin sees all products (active + inactive), public sees only active
    const productFilter = {};
    if (!req.admin) {
      productFilter.isActive = true;
    }

    if (categoryId) {
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        productFilter.category = categoryId;
      } else {
        return next(new ApiError(400, 'Invalid category ID format'));
      }
    }

    if (type) productFilter.type = type;
    if (shape) productFilter.shape = shape;
    if (occasion) productFilter.occasion = occasion;
    if (carat) productFilter.carat = carat;
    if (style) productFilter.style = style;
    if (metal) productFilter.metal = metal;
    if (gender) productFilter.gender = gender;

    if (search) {
      productFilter.name = { $regex: search, $options: 'i' };
    }

    const filteredProducts = await productService.getProductsList({
      isAdmin: !!req.admin,
      productFilter,
    });

    let paginatedProducts, total, pagination = null;
    if (hasPagination) {
      const { page, limit, skip } = parsePagination(req);
      total = filteredProducts.length;
      paginatedProducts = filteredProducts.slice(skip, skip + limit);
      pagination = calculatePagination(page, limit, total);
    } else {
      total = filteredProducts.length;
      paginatedProducts = filteredProducts;
    }

    return sendListResponse(res, paginatedProducts, 200, 'Products retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id, !!req.admin);
    if (!product) {
      return sendResponse(res, null, 200, 'Product not found');
    }
    return sendResponse(res, product, 200, 'Product retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.files) {
      if (req.files.img && req.files.img.length > 0) {
        const paths = constructImagePath(req.files.img[0], 'products');
        if (paths.length > 0) payload.img = paths[0];
      }
      if (req.files.hoverImg && req.files.hoverImg.length > 0) {
        const paths = constructImagePath(req.files.hoverImg[0], 'products');
        if (paths.length > 0) payload.hoverImg = paths[0];
      }
    }

    const product = await productService.createNewProduct(payload);
    return sendResponse(res, product, 201, 'Product created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.files) {
      if (req.files.img && req.files.img.length > 0) {
        const paths = constructImagePath(req.files.img[0], 'products');
        if (paths.length > 0) payload.img = paths[0];
      }
      if (req.files.hoverImg && req.files.hoverImg.length > 0) {
        const paths = constructImagePath(req.files.hoverImg[0], 'products');
        if (paths.length > 0) payload.hoverImg = paths[0];
      }
    }

    const product = await productService.updateProductById(req.params.id, payload);

    if (!product) {
      return sendResponse(res, null, 200, 'Product not found');
    }

    return sendResponse(res, product, 200, 'Product updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProductById(req.params.id);
    if (!product) {
      return sendResponse(res, null, 200, 'Product not found');
    }
    return sendResponse(res, null, 200, 'Product deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
