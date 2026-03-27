const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const requiredVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: ${key} is not defined in environment; some features may fail.`);
  }
});

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI ||
    (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_NAME
      ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shivamnextgen.nawqr6w.mongodb.net/${process.env.DB_NAME}`
      : 'mongodb://localhost:27017/indigo'),
  jwtSecret: process.env.JWT_SECRET || 'super-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  otpCodeLength: Number(process.env.OTP_CODE_LENGTH) || 6,
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES) || 5,
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'no-reply@indigo.com',
  },
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  sentryDsn: process.env.SENTRY_DSN,
};

module.exports = config;
