const jwt = require('jsonwebtoken');
const config = require('../config/env');
const Admin = require('../modules/auth/Admin');
const ApiError = require('../utils/api-error');

const authMiddleware = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token missing'));
  }
  const token = authHeader.split(' ')[1];
  if (!token || token.trim() === '') return next(new ApiError(401, 'Token is required'));

  try {
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
    if (!payload.sub) return next(new ApiError(401, 'Invalid token payload'));
    const admin = await Admin.findById(payload.sub);
    if (!admin) return next(new ApiError(401, 'Unauthorized user - admin not found'));
    req.admin = admin;
    req.tokenPayload = payload;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return next(new ApiError(401, 'Token has expired. Please login again.'));
    if (error.name === 'JsonWebTokenError') return next(new ApiError(401, 'Invalid token format or signature'));
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

const optionalAuthMiddleware = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
  const token = authHeader.split(' ')[1];
  if (!token || token.trim() === '') return next(new ApiError(401, 'Token is required'));

  try {
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
    if (!payload.sub) return next();
    const admin = await Admin.findById(payload.sub);
    if (admin) {
      req.admin = admin;
      req.tokenPayload = payload;
    }
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return next(new ApiError(401, 'Token has expired. Please login again.'));
    if (error.name === 'JsonWebTokenError') return next(new ApiError(401, 'Invalid token format or signature'));
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware
};
