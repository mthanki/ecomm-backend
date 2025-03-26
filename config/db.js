const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'postgres', // Change to 'mysql' if using MySQL
});

module.exports = { sequelize };
