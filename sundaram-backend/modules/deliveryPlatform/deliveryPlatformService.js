const DeliveryPlatform = require('./DeliveryPlatform');

class DeliveryPlatformService {
    async listPlatforms() {
        return await DeliveryPlatform.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
    }

    async getAllPlatformsWithSearch(search) {
        const filter = {};
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        return await DeliveryPlatform.find(filter).sort({ sortOrder: 1, name: 1 });
    }

    async getPlatformById(id) {
        return await DeliveryPlatform.findById(id);
    }

    async createPlatform(data) {
        return await DeliveryPlatform.create(data);
    }

    async updatePlatformById(id, data) {
        return await DeliveryPlatform.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deletePlatformById(id) {
        return await DeliveryPlatform.findByIdAndDelete(id);
    }
}

module.exports = new DeliveryPlatformService();
