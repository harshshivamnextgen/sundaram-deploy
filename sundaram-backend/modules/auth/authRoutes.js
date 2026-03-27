const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const {
  login,
  verifyOtp,
  createAdmin,
  forgotPassword,
  resetPassword,
  getProfile,
  verifyToken,
} = require('./authController');
const {
  loginSchema,
  verifyOtpSchema,
  createAdminSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./authValidation');

const router = express.Router();

// Public: login (sends OTP)
router.post('/login', validateRequest(loginSchema), login);

// Public: verify OTP and get token
router.post('/verify-otp', validateRequest(verifyOtpSchema), verifyOtp);

// Public: initial admin setup
router.post('/setup', validateRequest(createAdminSchema), createAdmin);

// Public: forgot password (sends OTP)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);

// Public: reset password using OTP
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);

// Private: get admin profile
router.get('/profile', authMiddleware, getProfile);

// Private: verify token
router.get('/verify-token', authMiddleware, verifyToken);

module.exports = router;
