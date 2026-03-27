const crypto = require('crypto');

const generateNumericOtp = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  while (otp.length < length) {
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < bytes.length && otp.length < length; i += 1) {
      otp += digits[bytes[i] % digits.length];
    }
  }
  return otp;
};

module.exports = { generateNumericOtp };
