const ApiError = require('../utils/api-error');

const validateRequest = (schema, target = 'body') => (req, _res, next) => {
  const rawPayload = req[target];
  const payload = rawPayload === undefined ? {} : rawPayload;
  const result = schema.safeParse(payload);
  if (!result.success) {
    const issues = (result.error && (result.error.issues || result.error.errors)) || [];
    const details = Array.isArray(issues) && issues.length > 0
      ? issues.map((issue) => ({
          path: Array.isArray(issue.path) ? issue.path.join('.') : String(issue.path || 'unknown'),
          message: issue.message || 'Validation error',
        }))
      : [{ path: 'unknown', message: result.error?.message || 'Validation failed' }];
    return next(new ApiError(400, 'Validation failed', details));
  }
  req[target] = result.data;
  return next();
};

module.exports = validateRequest;
