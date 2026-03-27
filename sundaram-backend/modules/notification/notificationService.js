const Notification = require('./Notification');

class NotificationService {
    async getNotificationsList(filters) {
        const { skip, limit, search } = filters;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }

        const [notifications, total, unreadCount] = await Promise.all([
            Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Notification.countDocuments(filter),
            Notification.countDocuments({ isRead: false }),
        ]);

        return { notifications, total, unreadCount };
    }

    async markAsRead(id) {
        return await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );
    }
}

module.exports = new NotificationService();
