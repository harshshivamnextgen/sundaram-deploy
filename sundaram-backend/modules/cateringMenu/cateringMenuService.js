const CateringMenu = require('./CateringMenu');

class CateringMenuService {
    async getMenusList(filters) {
        const { skip, limit, search } = filters;
        const filter = { isActive: true };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        const [menus, total] = await Promise.all([
            CateringMenu.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
            CateringMenu.countDocuments(filter),
        ]);
        return { menus, total };
    }

    async getMenuById(id) {
        return await CateringMenu.findOne({ _id: id, isActive: true });
    }

    async createNewMenu(data) {
        return await CateringMenu.create(data);
    }

    async updateMenuById(id, data) {
        return await CateringMenu.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteMenuById(id) {
        return await CateringMenu.findByIdAndDelete(id);
    }
}

module.exports = new CateringMenuService();
