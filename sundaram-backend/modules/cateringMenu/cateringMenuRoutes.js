const express = require('express');
const { authMiddleware, optionalAuthMiddleware } = require('../../middlewares/auth.middleware');
const {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
} = require('./cateringMenuController');

const router = express.Router();

router.get('/', optionalAuthMiddleware, getMenus);
router.get('/:id', optionalAuthMiddleware, getMenu);
router.post('/', authMiddleware, createMenu);
router.put('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router;
