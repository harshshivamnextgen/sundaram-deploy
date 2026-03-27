const Blog = require('./Blog');

class BlogService {
    async getBlogsList(filters) {
        const { skip, limit, search } = filters;
        const filter = { isActive: true };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const [blogs, total] = await Promise.all([
            Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Blog.countDocuments(filter),
        ]);
        return { blogs, total };
    }

    async getBlogById(id) {
        return await Blog.findOne({ _id: id, isActive: true });
    }

    async createNewBlog(payload) {
        return await Blog.create(payload);
    }

    async updateBlogById(id, payload) {
        return await Blog.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }

    async deleteBlogById(id) {
        return await Blog.findByIdAndDelete(id);
    }
}

module.exports = new BlogService();
