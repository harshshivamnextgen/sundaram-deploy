const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'replied', 'closed'], default: 'new' },
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
