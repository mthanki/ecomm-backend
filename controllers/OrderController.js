const { Order } = require('../models/Order');
const { OrderItem } = require('../models/OrderItem');
const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product'); // Import Product model

exports.createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Fetch product details from the database
        const productIds = items.map(item => item.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => {
            const product = products.find(p => p._id.toString() === item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            return sum + product.price * item.quantity;
        }, 0);

        // Create the order
        const order = await Order.create({ userId, totalAmount });

        // Create order items
        const orderItems = items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: products.find(p => p._id.toString() === item.productId).price, // Use price from database
        }));
        await OrderItem.bulkCreate(orderItems);

        // Clear the cart
        await Cart.destroy({ where: { userId } });

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem }],
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
