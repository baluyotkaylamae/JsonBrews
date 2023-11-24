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

app.post('/api/create-order', orderController.newOrder);
// app.post('/api/order/generate-pdf/:orderId', async (req, res) => {
//     try {
//         const orderId = req.params.orderId;
//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({ message: `No Order found with this ID` });
//         }

//         const pdfPath = generateOrderPDF(order);
//         res.json({ path: pdfPath });
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         res.status(500).json({ message: 'Failed to generate PDF' });
//     }
// });

app.use('/api', categories);
app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);
app.use('/api', addons)

module.exports = app;
