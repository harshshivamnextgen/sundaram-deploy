const { z } = require('zod');
const config = require('../../config/env');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(config.otpCodeLength),
  sessionId: z.string().length(24),
});

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(config.otpCodeLength),
  sessionId: z.string().length(24),
  newPassword: z.string().min(8),
});

module.exports = {
  loginSchema,
  verifyOtpSchema,
  createAdminSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
