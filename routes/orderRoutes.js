const express = require('express');
const { createOrder, getOrderDetails } = require('../controllers/OrderController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrderDetails);

module.exports = router;
