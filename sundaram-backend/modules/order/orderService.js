const Order = require('./Order');

class OrderService {
    async getOrdersList(filters) {
        const { skip, limit } = filters;
        const [orders, total] = await Promise.all([
            Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category').populate('product'),
            Order.countDocuments(),
        ]);
        return { orders, total };
    }

    async getOrderById(id) {
        return await Order.findById(id).populate('category').populate('product');
    }

    async createNewOrder(data) {
        return await Order.create(data);
    }

    async updateOrderStatus(id, status) {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    }

    async deleteOrderById(id) {
        return await Order.findByIdAndDelete(id);
    }
}

module.exports = new OrderService();
