const Inquiry = require('./Inquiry');
const Notification = require('../notification/Notification');

class InquiryService {
    async createInquiry(data) {
        const inquiry = await Inquiry.create(data);
        await Notification.create({
            type: 'inquiry',
            inquiryType: inquiry.type,
            inquiryId: inquiry._id,
            title: `New ${inquiry.type} inquiry from ${inquiry.name}`,
            message: `${inquiry.message} (Email: ${inquiry.email}, Phone: ${inquiry.phone})`,
        });
        return inquiry;
    }

    async getInquiriesList(filters) {
        const { skip, limit, search } = filters;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }
        const [inquiries, total] = await Promise.all([
            Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Inquiry.countDocuments(filter),
        ]);
        return { inquiries, total };
    }

    async getInquiryById(id) {
        return await Inquiry.findById(id);
    }

    async updateStatus(id, status) {
        return await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    }
}

module.exports = new InquiryService();
