const Order = require('../order/Order');

class ContactService {
    async saveInquiry(data) {
        // In this codebase, contact inquiries are saved as "Orders" with specific fields.
        // This seems to be a design choice by the developer.
        const inquiry = new Order(data);
        return await inquiry.save();
    }
}

module.exports = new ContactService();
