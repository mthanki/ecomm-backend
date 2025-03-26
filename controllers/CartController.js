const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product'); // Import Product model (Mongoose)

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, productId, quantity });
        }

        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch cart items from Sequelize
        const cartItems = await Cart.findAll({ where: { userId } });

        // Extract product IDs from cart items
        const productIds = cartItems.map(item => item.productId);

        // Fetch product details from Mongoose
        const products = await Product.find({ _id: { $in: productIds } });

        // Merge cart items with product details
        const cartWithDetails = cartItems.map(cartItem => {
            const product = products.find(p => p._id.toString() === cartItem.productId);
            return {
                ...cartItem.toJSON(),
                product, // Attach product details
            };
        });

        res.json(cartWithDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cartItem = await Cart.findOne({ where: { userId, productId } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
