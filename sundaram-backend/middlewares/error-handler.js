const { Sentry } = require('../config/sentry');
const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  if (config.nodeEnv === 'production' && Sentry && Sentry.captureException) {
    Sentry.captureException(err);
  }
  const status = err.status || 500;
  const response = { status: false, code: status, message: err.message || 'Internal server error', data: null };
  if (err.details) response.details = err.details;
  if (req.app.get('env') !== 'production') response.stack = err.stack;
  res.status(status).json(response);
};

module.exports = errorHandler;
