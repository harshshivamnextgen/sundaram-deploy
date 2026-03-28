const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { initializeSentry, getSentryRequestHandler, getSentryErrorHandler } = require('./config/sentry');
const config = require('./config/env');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const PORT = config.port || 5000;
const isNetlify = !!process.env.NETLIFY;

const sentry = initializeSentry();
if (sentry) {
  const h = getSentryRequestHandler();
  if (h) app.use(h);
}

// app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./modules/auth/authRoutes');
const bannerRoutes = require('./modules/banner/bannerRoutes');
const categoryRoutes = require('./modules/category/categoryRoutes');
const productRoutes = require('./modules/product/productRoutes');
const offerRoutes = require('./modules/offer/offerRoutes');
const blogRoutes = require('./modules/blog/blogRoutes');
const reviewRoutes = require('./modules/review/reviewRoutes');
const inquiryRoutes = require('./modules/inquiry/inquiryRoutes');
const notificationRoutes = require('./modules/notification/notificationRoutes');
const siteSettingsRoutes = require('./modules/siteSettings/siteSettingsRoutes');
const orderRoutes = require('./modules/order/orderRoutes');
const contactRoutes = require('./modules/contact/contactRoutes');
const contentPageRoutes = require('./modules/contentPage/contentPageRoutes');
const cateringMenuRoutes = require('./modules/cateringMenu/cateringMenuRoutes');
const deliveryPlatformRoutes = require('./modules/deliveryPlatform/deliveryPlatformRoutes');

app.use('/auth', authRoutes);
app.use('/banners', bannerRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/offers', offerRoutes);
app.use('/blogs', blogRoutes);
app.use('/reviews', reviewRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/admin/notifications', notificationRoutes);
app.use('/site-settings', siteSettingsRoutes);
app.use('/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/content-pages', contentPageRoutes);
app.use('/catering-menus', cateringMenuRoutes);
app.use('/delivery-platforms', deliveryPlatformRoutes);

// Static uploads
const uploadsDir = path.join(__dirname, 'uploads');
const subdirs = ['products', 'offers', 'blogs', 'admins', 'banners', 'branding'];
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
subdirs.forEach((d) => {
  const p = path.join(uploadsDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});
app.use('/uploads', express.static(uploadsDir));

// Serve static files from the 'public' folder (React frontend)
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
app.use(express.static(publicDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Catch-all route to serve the frontend index.html for React SPA routing
app.get('*', (req, res, next) => {
  // List of paths that should NOT be redirected to index.html (API and Auth routes)
  const apiPaths = [
    '/auth',
    '/banners',
    '/categories',
    '/products',
    '/offers',
    '/blogs',
    '/reviews',
    '/inquiries',
    '/admin/notifications',
    '/site-settings',
    '/orders',
    '/api',
    '/content-pages',
    '/catering-menus',
    '/delivery-platforms'
  ];

  // If it's an API route that wasn't caught, pass to 404 handler
  if (apiPaths.some(p => req.path.startsWith(p))) {
    return next();
  }

  res.sendFile(path.join(publicDir, 'index.html'));
});

// 404 for API/Auth
app.use((_req, _res, next) => {
  const err = new Error('API Route not found');
  err.status = 404;
  next(err);
});

if (sentry) {
  const h = getSentryErrorHandler();
  if (h) app.use(h);
}
app.use(errorHandler);

// MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shivamnextgen.nawqr6w.mongodb.net/${process.env.DB_NAME}`);
};

// Local server startup
if (!isNetlify) {
  connectDB()
    .then(async () => {
      console.log('Connected to MongoDB');
      try {
        const authService = require('./modules/auth/authService');
        await authService.ensureDefaultAdmin();
      } catch (e) {
        console.warn('Admin seed skipped:', e.message);
      }
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = app;
module.exports.connectDB = connectDB;
