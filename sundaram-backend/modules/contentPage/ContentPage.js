const mongoose = require('mongoose');

const contentPageSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: null, trim: true },
    plainTextContent: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContentPage', contentPageSchema);
