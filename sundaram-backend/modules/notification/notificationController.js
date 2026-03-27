const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const notificationService = require('./notificationService');

const listNotifications = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { notifications, total, unreadCount } = await notificationService.getNotificationsList({
      skip,
      limit,
      search,
    });

    const pagination = calculatePagination(page, limit, total);
    pagination.unreadCount = unreadCount;
    return sendListResponse(res, notifications, 200, 'Notifications retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);
    if (!notification) {
      return sendResponse(res, null, 200, 'Notification not found');
    }
    return sendResponse(res, notification, 200, 'Notification marked as read');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listNotifications,
  markNotificationRead,
};
