const dayjs = require('dayjs');
const Banner = require('./Banner');

/**
 * Service to handle all Banner related database operations
 */
class BannerService {
    /**
     * List banners with filtering, search, and pagination
     */
    async getBannersList(filters) {
        const {
            page = 1,
            limit = 10,
            skip = 0,
            search = '',
            type = '',
            pageKey = '',
            position = '',
            activeOnly = true
        } = filters;

        const now = dayjs();
        const filter = {};

        // Type filter: match by type OR pageKey (for backward compatibility)
        if (type) {
            filter.$or = [
                { type: type },
                { pageKey: type },
            ];
        }

        // pageKey filter: if provided separately
        if (pageKey) {
            if (type) {
                const typeCondition = filter.$or;
                delete filter.$or;
                filter.$and = [
                    { $or: typeCondition },
                    { pageKey: pageKey },
                ];
            } else {
                filter.pageKey = pageKey;
            }
        }

        if (position) {
            filter.position = position;
        }

        if (activeOnly) {
            filter.isActive = true;
            const dateConditions = [
                {
                    $or: [
                        { startDate: { $exists: false } },
                        { startDate: null },
                        { startDate: { $lte: now.toDate() } },
                    ],
                },
                {
                    $or: [
                        { endDate: { $exists: false } },
                        { endDate: null },
                        { endDate: { $gte: now.toDate() } },
                    ],
                }
            ];

            if (filter.$and) {
                filter.$and = [...filter.$and, ...dateConditions];
            } else {
                filter.$and = dateConditions;
            }
        }

        if (search) {
            const searchCondition = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { subtitle: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            };

            if (filter.$and) {
                filter.$and.push(searchCondition);
            } else {
                // If we only have search, we use $or. If we have other conditions, we use $and.
                if (Object.keys(filter).length > 0) {
                    filter.$and = filter.$and || [];
                    filter.$and.push(searchCondition);
                } else {
                    filter.$or = searchCondition.$or;
                }
            }
        }

        const [banners, total] = await Promise.all([
            Banner.find(filter)
                .sort({ sortOrder: 1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Banner.countDocuments(filter),
        ]);

        return { banners, total };
    }

    /**
     * Get a single banner by ID
     */
    async getBannerById(id) {
        return await Banner.findById(id);
    }

    /**
     * Create a new banner
     */
    async createNewBanner(payload) {
        return await Banner.create(payload);
    }

    /**
     * Update an existing banner
     */
    async updateBannerById(id, payload) {
        return await Banner.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }

    /**
     * Delete a banner
     */
    async deleteBannerById(id) {
        return await Banner.findByIdAndDelete(id);
    }
}

module.exports = new BannerService();
