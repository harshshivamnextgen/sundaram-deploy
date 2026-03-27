const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const Admin = require('./Admin');
const OtpSession = require('./OtpSession');
const config = require('../../config/env');
const { generateNumericOtp } = require('../../utils/otp');
const { sendEmail } = require('../../utils/email');
const { generateOtpEmail } = require('../../utils/email-templates');

class AuthService {
    async getAdminByEmail(email) {
        return await Admin.findOne({ email });
    }

    async findOtpSessionById(sessionId) {
        return await OtpSession.findById(sessionId).populate('admin');
    }

    async countAdmins() {
        return await Admin.countDocuments();
    }

    async createAdmin(email, password) {
        const admin = new Admin({ email, password });
        return await admin.save();
    }

    async createOtpSession(adminId, otpCode) {
        const otpHash = await bcrypt.hash(otpCode, 10);
        const expiresAt = dayjs().add(config.otpExpiryMinutes, 'minute').toDate();

        return await OtpSession.create({
            admin: adminId,
            otpHash,
            expiresAt,
        });
    }

    async sendOtpEmail(email, otpCode, type) {
        const emailContent = generateOtpEmail({
            otpCode,
            expiryMinutes: config.otpExpiryMinutes,
            type,
        });

        await sendEmail({
            to: email,
            subject: type === 'login' ? 'Sundaram Admin Login OTP' : 'Sundaram Admin Password Reset OTP',
            html: emailContent.html,
            text: emailContent.text,
        });
    }

    generateToken(admin) {
        return jwt.sign(
            { sub: admin._id, email: admin.email },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
        );
    }

    async ensureDefaultAdmin() {
        if (!config.adminEmail || !config.adminPassword) {
            console.warn('Default admin credentials are not configured');
            return;
        }
        const exists = await Admin.findOne({ email: config.adminEmail });
        if (exists) return;
        const admin = new Admin({ email: config.adminEmail, password: config.adminPassword });
        await admin.save();
        console.log('Default admin account seeded');
    }

    generateOtpCode() {
        return generateNumericOtp(config.otpCodeLength);
    }
}

module.exports = new AuthService();
