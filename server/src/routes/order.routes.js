const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/my-orders', verifyToken, orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;
