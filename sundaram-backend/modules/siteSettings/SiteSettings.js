const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, required: true, trim: true, default: 'SUNDARAM LAXURY CRAFT' },
    logo: { type: String, trim: true, default: null },
    favicon: { type: String, trim: true, default: null },
    address: { type: String, trim: true, default: null },
    mobileNumber: { type: String, trim: true, default: null },
    whatsappNumber: { type: String, trim: true, default: null },
    supportEmail: { type: String, trim: true, default: null },
    socialMedia: { type: [socialMediaSchema], default: [] },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
