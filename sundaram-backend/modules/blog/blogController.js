const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const blogService = require('./blogService');

const getBlogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { blogs, total } = await blogService.getBlogsList({ skip, limit, search });
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, blogs, 200, 'Blogs retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) {
      return sendResponse(res, null, 200, 'Blog not found');
    }
    return sendResponse(res, blog, 200, 'Blog retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      ...(req.file ? { image: `uploads/blogs/${req.file.filename}` } : {}),
    };
    const blog = await blogService.createNewBlog(payload);
    return sendResponse(res, blog, 201, 'Blog created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      ...(req.file ? { image: `uploads/blogs/${req.file.filename}` } : {}),
    };
    const blog = await blogService.updateBlogById(req.params.id, payload);

    if (!blog) {
      return sendResponse(res, null, 200, 'Blog not found');
    }

    return sendResponse(res, blog, 200, 'Blog updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogService.deleteBlogById(req.params.id);
    if (!blog) {
      return sendResponse(res, null, 200, 'Blog not found');
    }
    return sendResponse(res, null, 200, 'Blog deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
