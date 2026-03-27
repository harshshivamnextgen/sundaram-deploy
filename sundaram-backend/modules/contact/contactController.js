const nodemailer = require('nodemailer');
const contactService = require('./contactService');
const config = require('../../config/env');

const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: false, // true for 465, false for 587/others
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const customer = await contactService.saveInquiry({ firstName, lastName, email, phone, service, message });

    const mailOptions = {
      from: config.emailUser,
      to: config.companyEmail,
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `
    };

    transporter.sendMail(mailOptions, (emailErr, info) => {
      if (emailErr) console.error('Email error:', emailErr);
      else console.log('Email sent:', info.messageId);
    });

    res.json({
      success: true,
      message: "Thank you for your inquiry! We'll contact you within 24 hours.",
      customerId: customer._id
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = { submitContactForm };
