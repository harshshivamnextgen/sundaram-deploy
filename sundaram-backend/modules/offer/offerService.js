const dayjs = require('dayjs');
const Offer = require('./Offer');

class OfferService {
    async getOffersList(filters) {
        const { search } = filters;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const offers = await Offer.find(filter).sort({ startDate: -1 });
        const now = dayjs();

        // Compute isActive dynamically and filter only active ones for public
        return offers
            .map((offer) => {
                const isActive =
                    now.isAfter(dayjs(offer.startDate).subtract(1, 'minute')) &&
                    now.isBefore(dayjs(offer.endDate).add(1, 'minute'));
                return { ...offer.toObject(), isActive };
            })
            .filter((offer) => offer.isActive);
    }

    async getOfferById(id) {
        const offer = await Offer.findById(id);
        if (!offer) return null;

        const now = dayjs();
        const isActive =
            now.isAfter(dayjs(offer.startDate).subtract(1, 'minute')) &&
            now.isBefore(dayjs(offer.endDate).add(1, 'minute'));

        if (!isActive) return null;

        return { ...offer.toObject(), isActive };
    }

    async createNewOffer(payload) {
        return await Offer.create(payload);
    }

    async updateOfferById(id, payload) {
        return await Offer.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }

    async deleteOfferById(id) {
        return await Offer.findByIdAndDelete(id);
    }
}

module.exports = new OfferService();
