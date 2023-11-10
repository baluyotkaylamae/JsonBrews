const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const categories = require('./routes/category');
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const addons = require('./routes/addons')
const orderController = require('./controllers/orderController');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Define a POST route for creating a new order
app.post('/api/create-order', orderController.newOrder);

// Define your other routes
app.use('/api', categories);
app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);
app.use('/api', addons)

module.exports = app;
