const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['inquiry'] },
    inquiryType: { type: String, required: true, enum: ['contact', 'catering', 'wholesale'] },
    inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
