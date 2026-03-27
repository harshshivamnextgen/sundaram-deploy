const sendListResponse = (res, data = [], code = 200, message = 'Success', pagination = null) => {
  const response = { status: true, code, message, data: Array.isArray(data) ? data : [] };
  if (pagination) response.pagination = pagination;
  return res.status(code).json(response);
};

const sendResponse = (res, data = null, code = 200, message = 'Success') => {
  const response = { status: true, code, message, data: data || null };
  return res.status(code).json(response);
};

const calculatePagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page: Number(page),
    limit: Number(limit),
    total: Number(total),
    totalPages: Number(totalPages),
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

const parsePagination = (req) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

module.exports = { sendListResponse, sendResponse, calculatePagination, parsePagination };
