const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: { user: config.email.user, pass: config.email.pass },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
});

const sendEmail = async ({ to, subject, html, text }) => {
  if (!config.email.user || !config.email.pass) {
    const err = new Error('Email is not configured. Set EMAIL_USER and EMAIL_PASS in .env');
    err.code = 'EMAIL_NOT_CONFIGURED';
    throw err;
  }
  await transporter.sendMail({ from: config.email.from, to, subject, html, text });
};

module.exports = { sendEmail };
