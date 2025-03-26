const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const { sequelize } = require('./config/db');
const connectMongo = require('./config/mongo');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes); // Ensure this line exists and is correct
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

// Database connections
sequelize.authenticate()
    .then(() => console.log('SQL Database connected'))
    .catch(err => console.error('SQL Connection error:', err));

// Sync database schema
sequelize.sync({ alter: true }) // Use { force: true } only for development
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

connectMongo()
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB Connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
