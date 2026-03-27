const ApiError = require('../../utils/api-error');
const { sendResponse } = require('../../utils/api-response');
const siteSettingsService = require('./siteSettingsService');

const getPublicSiteSettings = async (req, res, next) => {
  try {
    const settings = await siteSettingsService.getSettings();
    if (!settings) {
      return sendResponse(res, null, 200, 'Site settings not found');
    }
    const publicSettings = {
      siteName: settings.siteName,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      socialLinks: settings.socialLinks,
      logo: settings.logo,
      favicon: settings.favicon,
    };
    return sendResponse(res, publicSettings, 200, 'Public settings retrieved');
  } catch (error) {
    return next(error);
  }
};

const getAdminSiteSettings = async (req, res, next) => {
  try {
    const settings = await siteSettingsService.getSettings();
    return sendResponse(res, settings, 200, 'Admin site settings');
  } catch (error) {
    return next(error);
  }
};

const updateSiteSettings = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.files) {
      if (req.files.logo?.[0]) payload.logo = `uploads/branding/${req.files.logo[0].filename}`;
      if (req.files.favicon?.[0]) payload.favicon = `uploads/branding/${req.files.favicon[0].filename}`;
      if (req.files.heroBanner?.[0]) payload.heroBanner = `uploads/branding/${req.files.heroBanner[0].filename}`;
    }
    const settings = await siteSettingsService.updateSettings(payload);
    return sendResponse(res, settings, 200, 'Settings updated');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPublicSiteSettings,
  getAdminSiteSettings,
  updateSiteSettings,
};
