const Sentry = require('@sentry/node');
const config = require('./env');

const initializeSentry = () => {
  if (config.nodeEnv !== 'production') {
    console.log('ℹ️  Sentry is disabled in development mode');
    return null;
  }
  if (!process.env.SENTRY_DSN) {
    console.warn('⚠️  SENTRY_DSN not found. Sentry is disabled.');
    return null;
  }
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: 'production',
      tracesSampleRate: 1.0,
      integrations: [Sentry.expressIntegration()],
    });
    console.log('✅ Sentry initialized for production');
    return Sentry;
  } catch (error) {
    console.error('❌ Failed to initialize Sentry:', error.message);
    return null;
  }
};

const getSentryRequestHandler = () => {
  if (Sentry?.Handlers?.requestHandler) return Sentry.Handlers.requestHandler();
  if (typeof Sentry.expressRequestHandler === 'function') return Sentry.expressRequestHandler();
  return null;
};

const getSentryErrorHandler = () => {
  if (Sentry?.Handlers?.errorHandler) return Sentry.Handlers.errorHandler();
  if (typeof Sentry.expressErrorHandler === 'function') return Sentry.expressErrorHandler();
  return null;
};

module.exports = {
  initializeSentry,
  getSentryRequestHandler,
  getSentryErrorHandler,
  Sentry,
};
