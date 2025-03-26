const express = require('express');
const { listProducts } = require('../controllers/ProductController');
const { Product } = require('../models/Product'); // Ensure Product is imported correctly
const router = express.Router();

router.get('/', listProducts);
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Ensure this matches the database logic
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

router.post('/details', async (req, res) => {
    try {
        const { productIds } = req.body;
        const products = await Product.find({ _id: { $in: productIds } }); // Fetch products by IDs
        res.json(products);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
