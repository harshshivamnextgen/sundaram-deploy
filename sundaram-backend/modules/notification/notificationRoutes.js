const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const {
  listNotifications,
  markNotificationRead,
} = require('./notificationController');

const router = express.Router();

router.get('/', authMiddleware, listNotifications);
router.patch('/:id/read', authMiddleware, markNotificationRead);

module.exports = router;
