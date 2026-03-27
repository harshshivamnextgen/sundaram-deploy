const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['home', 'collections', 'offers', 'blogs', 'about', 'contact', 'bridal', 'festive', 'other'], default: 'other', trim: true, lowercase: true },
    pageKey: { type: String, required: true, trim: true, lowercase: true },
    position: { type: String, enum: ['hero', 'top', 'bottom', 'sidebar'], default: 'hero' },
    image: { type: String },
    mobileImage: { type: String },
    ctaLabel: { type: String, trim: true },
    ctaUrl: { type: String, trim: true },
    backgroundColor: { type: String },
    textColor: { type: String },
    sortOrder: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
