const SiteSettings = require('./SiteSettings');

class SiteSettingsService {
    async getSettings() {
        return await SiteSettings.findOne();
    }

    async updateSettings(data) {
        return await SiteSettings.findOneAndUpdate({}, data, {
            new: true,
            upsert: true,
            runValidators: true,
        });
    }
}

module.exports = new SiteSettingsService();
