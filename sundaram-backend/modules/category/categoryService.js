const Category = require('./Category');

class CategoryService {
    async getCategoriesList(filters) {
        const { skip, limit, search, isAdmin } = filters;
        const filter = {};
        if (!isAdmin) {
            filter.isActive = true;
        }
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const [categories, total] = await Promise.all([
            Category.find(filter).sort({ order: 1, name: 1 }).skip(skip).limit(limit),
            Category.countDocuments(filter),
        ]);
        return { categories, total };
    }

    async getCategoryById(id, isAdmin) {
        const filter = { _id: id };
        if (!isAdmin) {
            filter.isActive = true;
        }
        return await Category.findOne(filter);
    }

    async findByName(name) {
        return await Category.findOne({ name });
    }

    async createNewCategory(data) {
        return await Category.create(data);
    }

    async updateCategoryById(id, data) {
        return await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteCategoryById(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = new CategoryService();
