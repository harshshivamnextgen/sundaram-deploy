const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const authService = require('./authService');
const config = require('../../config/env');
const ApiError = require('../../utils/api-error');
const { sendResponse } = require('../../utils/api-response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await authService.getAdminByEmail(email);

    if (!admin) {
      return next(new ApiError(400, 'You are not authorized to access this resource'));
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError(400, 'Username or password is incorrect'));
    }

    const otpCode = authService.generateOtpCode();
    const otpSession = await authService.createOtpSession(admin._id, otpCode);

    try {
      await authService.sendOtpEmail(admin.email, otpCode, 'login');
    } catch (emailError) {
      console.error('[Login] OTP email failed:', emailError.message);
      const isDev = config.nodeEnv !== 'production';
      const message = isDev
        ? `OTP email failed: ${emailError.message}`
        : 'Failed to send OTP email. Please check your email configuration or try again later.';
      return next(new ApiError(503, message));
    }

    return sendResponse(res, { sessionId: otpSession._id }, 200, 'OTP sent to the administrator email.');
  } catch (error) {
    return next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { sessionId, email, otp } = req.body;
    const session = await authService.findOtpSessionById(sessionId);

    if (!session || session.verified) {
      return next(new ApiError(400, 'OTP session is invalid'));
    }

    if (dayjs().isAfter(session.expiresAt)) {
      return next(new ApiError(400, 'OTP has expired'));
    }

    if (!session.admin || session.admin.email !== email) {
      return next(new ApiError(400, 'OTP session mismatch'));
    }

    const validOtp = await bcrypt.compare(otp, session.otpHash);
    if (!validOtp) {
      return next(new ApiError(400, 'Invalid OTP provided'));
    }

    session.verified = true;
    await session.save();

    const token = authService.generateToken(session.admin);
    return sendResponse(res, { token }, 200, 'OTP verified successfully');
  } catch (error) {
    return next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminCount = await authService.countAdmins();
    if (adminCount > 0) {
      return next(new ApiError(400, 'Admin already exists'));
    }

    const existingByEmail = await authService.getAdminByEmail(email);
    if (existingByEmail) {
      return next(new ApiError(400, 'Admin already exists'));
    }

    const admin = await authService.createAdmin(email, password);

    const adminData = {
      _id: admin._id,
      email: admin.email,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    return sendResponse(res, adminData, 201, 'Admin created successfully');
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const admin = await authService.getAdminByEmail(email);

    if (!admin) {
      return sendResponse(res, null, 200, 'If the email exists, a password reset OTP has been sent.');
    }

    const otpCode = authService.generateOtpCode();
    const otpSession = await authService.createOtpSession(admin._id, otpCode);

    try {
      await authService.sendOtpEmail(admin.email, otpCode, 'password-reset');
    } catch (emailError) {
      console.error('[ForgotPassword] Reset email failed:', emailError.message);
      const isDev = config.nodeEnv !== 'production';
      const message = isDev
        ? `Password reset email failed: ${emailError.message}`
        : 'Failed to send password reset email. Please check your email configuration or try again later.';
      return next(new ApiError(503, message));
    }

    return sendResponse(res, { sessionId: otpSession._id }, 200, 'Password reset OTP sent to the administrator email.');
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { sessionId, email, otp, newPassword } = req.body;
    const session = await authService.findOtpSessionById(sessionId);

    if (!session || session.verified) {
      return next(new ApiError(400, 'OTP session is invalid'));
    }

    if (dayjs().isAfter(session.expiresAt)) {
      return next(new ApiError(400, 'OTP has expired'));
    }

    if (!session.admin || session.admin.email !== email) {
      return next(new ApiError(400, 'OTP session mismatch'));
    }

    const validOtp = await bcrypt.compare(otp, session.otpHash);
    if (!validOtp) {
      return next(new ApiError(400, 'Invalid OTP provided'));
    }

    session.admin.password = newPassword;
    await session.admin.save();

    session.verified = true;
    await session.save();

    return sendResponse(res, null, 200, 'Password reset successfully');
  } catch (error) {
    return next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const admin = req.admin;

    if (!admin) {
      return next(new ApiError(401, 'Unauthorized user'));
    }

    const profileData = {
      _id: admin._id,
      email: admin.email,
      image: admin.image || null,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    return sendResponse(res, profileData, 200, 'Profile retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const admin = req.admin;

    if (!admin) {
      return next(new ApiError(401, 'Unauthorized user'));
    }

    const tokenData = {
      valid: true,
      admin: {
        _id: admin._id,
        email: admin.email,
      },
    };

    return sendResponse(res, tokenData, 200, 'Token is valid');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  verifyOtp,
  createAdmin,
  forgotPassword,
  resetPassword,
  getProfile,
  verifyToken,
};
