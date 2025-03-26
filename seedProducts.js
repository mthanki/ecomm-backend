const mongoose = require('mongoose');
const { Product } = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const dummyProducts = [
    {
        name: 'Wireless Mouse',
        description: 'A high-precision wireless mouse with ergonomic design.',
        price: 25.99,
        category: 'Electronics',
        stock: 50,
    },
    {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        price: 45.99,
        category: 'Electronics',
        stock: 30,
    },
    {
        name: 'Running Shoes',
        description: 'Comfortable and durable running shoes for all terrains.',
        price: 60.00,
        category: 'Footwear',
        stock: 20,
    },
    {
        name: 'Backpack',
        description: 'Stylish and spacious backpack for everyday use.',
        price: 35.50,
        category: 'Accessories',
        stock: 40,
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared');

        // Insert dummy products
        await Product.insertMany(dummyProducts);
        console.log('Dummy products added successfully');

        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding products:', error);
        mongoose.disconnect();
    }
};

seedProducts();
