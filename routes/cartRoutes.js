const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/CartController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authenticate, addToCart);
router.get('/:userId', authenticate, getCart);
router.delete('/remove', authenticate, removeFromCart);

module.exports = router;
