const ContentPage = require('./ContentPage');

class ContentPageService {
    async listPages() {
        return await ContentPage.find().sort({ title: 1 });
    }

    async getPageBySlug(slug) {
        return await ContentPage.findOne({ slug, isActive: true });
    }

    async getPageById(id) {
        return await ContentPage.findById(id);
    }

    async createPage(data) {
        return await ContentPage.create(data);
    }

    async updatePageById(id, data) {
        return await ContentPage.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deletePageById(id) {
        return await ContentPage.findByIdAndDelete(id);
    }
}

module.exports = new ContentPageService();
