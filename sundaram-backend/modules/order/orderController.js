const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const orderService = require('./orderService');

const getOrders = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const { orders, total } = await orderService.getOrdersList({ skip, limit });
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, orders, 200, 'Orders retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return sendResponse(res, null, 200, 'Order not found');
    }
    return sendResponse(res, order, 200, 'Order retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createNewOrder(req.body);
    return sendResponse(res, order, 201, 'Order created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!order) {
      return sendResponse(res, null, 200, 'Order not found');
    }
    return sendResponse(res, order, 200, 'Order status updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await orderService.deleteOrderById(req.params.id);
    if (!order) {
      return sendResponse(res, null, 200, 'Order not found');
    }
    return sendResponse(res, null, 200, 'Order deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
