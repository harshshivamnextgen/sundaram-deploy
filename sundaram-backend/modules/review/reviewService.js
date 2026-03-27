const Review = require('./Review');

class ReviewService {
    async getReviewsList(filters) {
        const { skip, limit, search, isAdmin } = filters;
        const filter = {};
        if (!isAdmin) {
            filter.isActive = true;
            filter.rating = { $in: [4, 5] };
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }

        const [reviews, total] = await Promise.all([
            Review.find(filter)
                .sort({ order: 1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Review.countDocuments(filter),
        ]);
        return { reviews, total };
    }

    async getReviewById(id, isAdmin) {
        const filter = { _id: id };
        if (!isAdmin) {
            filter.isActive = true;
            filter.rating = { $in: [4, 5] };
        }
        return await Review.findOne(filter);
    }

    async createNewReview(payload) {
        return await Review.create(payload);
    }

    async updateReviewById(id, payload) {
        return await Review.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }

    async deleteReviewById(id) {
        return await Review.findByIdAndDelete(id);
    }

    async getStats(isAdmin) {
        const filter = isAdmin ? {} : { isActive: true };
        const stats = await Review.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                    fourStarCount: {
                        $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] },
                    },
                    fiveStarCount: {
                        $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] },
                    },
                },
            },
        ]);
        return stats.length > 0 ? stats[0] : { averageRating: 0, totalReviews: 0, fourStarCount: 0, fiveStarCount: 0 };
    }
}

module.exports = new ReviewService();
