const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const validateRequest = require('../../middlewares/validate-request');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('./orderController');
const { orderSchema } = require('./orderValidation');

const router = express.Router();

router.post('/', authMiddleware, validateRequest(orderSchema), createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrder);
router.put('/:id', authMiddleware, validateRequest(orderSchema), updateOrderStatus);
router.delete('/:id', authMiddleware, deleteOrder);

module.exports = router;
