const generateOtpEmail = ({ otpCode, expiryMinutes, type = 'login' }) => {
  const isPasswordReset = type === 'password-reset';
  const title = isPasswordReset ? 'Password Reset OTP' : 'Login OTP';
  const purpose = isPasswordReset
    ? 'You requested to reset your password for your Indigo Admin account.'
    : 'You requested to login to your Indigo Admin account.';
  const actionText = isPasswordReset ? 'reset your password' : 'complete your login';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Sundaram Luxury Crafts</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa;">
    <tr>
      <td style="padding: 30px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
          <tr>
            <td style="padding: 45px 40px 30px; text-align: center; background-color: #761928; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 34px; font-weight: 700;">Sundaram Luxury Crafts</h1>
              <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px;">Admin Portal</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #761928; font-size: 24px;">${title}</h2>
              <p style="margin: 0 0 25px; color: #333333; font-size: 16px;">${purpose} Use the OTP code below to ${actionText}:</p>
              <div style="text-align: center; padding: 28px; background: #761928; border-radius: 10px; margin: 30px 0;">
                <div style="font-size: 40px; font-weight: 700; color: #ffffff; letter-spacing: 8px;">${otpCode}</div>
              </div>
              <p style="margin: 0; color: #761928; font-size: 14px;">This code will expire in ${expiryMinutes} minutes.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #FAF0E6; text-align: center;">
              <p style="margin: 0; color: #333333; font-size: 12px;">© ${new Date().getFullYear()} Sundaram Luxury Crafts.</p> 
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `${title}\n\n${purpose}\n\nYour OTP Code: ${otpCode}\n\nExpires in ${expiryMinutes} minutes.`;
  return { html, text };
};

module.exports = { generateOtpEmail };
