const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OtpSession', otpSchema);
