const Order = require('../models/order');
const Product = require('../models/product');
const nodemailer = require ('nodemailer');
const User = require('../models/user');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.newOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    try {
      
        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        });

        sendEmailToAdmin(order);

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);

        if (error.name === 'ValidationError') {
            // Handle validation error (e.g., required fields missing)
            res.status(400).json({
                success: false,
                message: `Validation error. ${error.message || 'Unknown error'}`
            });
        } else {
            // Handle other errors
            res.status(500).json({
                success: false,
                message: `Failed to create order. ${error.message || 'Unknown error'}`
            });
        }
    }
};


exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })

    }

    res.status(200).json({
        success: true,
        order
    })
}

exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
}

exports.allOrders = async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: `No Order found with this ID` });
        }

        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({ message: `This order has already been delivered` });
        }

        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity);
        });

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now();
        await order.save();

        if (order.orderStatus === 'Delivered') {
            sendEmailToCustomer(order);
        }

        sendEmailToAdmin(order);

        res.status(200).json({
            success: true,
            message: `Order delivered. The customer will take the order.`,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({
            success: false,
            message: `Failed to update order. ${error.message || 'Unknown error'}`,
        });
    }
};

async function generateOrderPDF(order) {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument();

        doc.fontSize(18).text('JSON Brews Order Receipt', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Order ID: ${order._id}`);
        doc.text(`Order Date: ${order.createdAt}`);
        doc.text(`Delivery Date: ${new Date(order.deliveredAt).toLocaleDateString()}`);
        doc.text(`Order Total: ₱${order.totalPrice.toFixed(2)}`);
        doc.moveDown();

        doc.fontSize(14).text('Customer Information:', { underline: true });
        try {
            const user = await User.findById(order.user);
            if (user) {
                doc.fontSize(12).text(`Name: ${user.name}`);
                doc.text(`Email: ${user.email}`);
            } else {
                doc.text('Customer information not available');
            }
        } catch (error) {
            doc.text('Error fetching customer information');
        }

        doc.moveDown();

        doc.text(`Address: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`);
        doc.moveDown();

        doc.fontSize(14).text('Ordered Products:', { underline: true });
        order.orderItems.forEach(item => {
            doc.fontSize(12).text(`- ${item.name} (₱${item.price.toFixed(2)} each) x ${item.quantity}`);
        });
        doc.moveDown();

        doc.fontSize(16).text('Thank you for choosing JSON Brews! Always at your service.', { align: 'center' });

        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer.toString('base64'));
        });

        doc.end();
    });
}

async function sendEmailToCustomer(order) {
    
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: '106117ceb561c5',
            pass: '2ffde51d81757b',
        },
    });

    const pdfContent = await generateOrderPDF(order);

    const mailOptions = {
        from: 'beaclarisse.elumba@tup.edu.ph',
        to: 'gorrqrosto@gmail.com',
        subject: 'Your Order has been Delivered',
        text: `Your order with ID ${order._id} has been delivered. Please prepare for the exact amount of ₱${order.totalPrice.toFixed(2)}. Enjoy!`,
        attachments: [
            {
                filename: 'receipt.pdf',
                content: pdfContent,
                encoding: 'base64',
            },
        ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email to customer:', error);
        } else {
            console.log('Email sent to customer:', info.response);
        }
    });
}





async function updateStock(id, quantity) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        product.stock = product.stock - quantity;
        await product.save({ validateBeforeSave: false });
    } catch (error) {
        
        console.error(`Error updating stock: ${error.message}`);
        throw error; 
    }
}


exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })
     
    }
    await order.remove()

    res.status(200).json({
        success: true
    })
}


function sendEmailToAdmin(order) {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '18a2a26eef4f45', 
            pass: '865719decb6b03' 
        }
    });

    const mailOptions = {
        from: order.user.email, 
        to: 'beaclarisse.elumba@tup.edu.ph', 
        subject: 'New Order from Customer',
        text: `A new order with ID ${order._id} has been placed. You can now proceed updating the order status.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

exports.totalOrders = async (req, res, next) => {
    const totalOrders = await Order.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ])
    if (!totalOrders) {
        return res.status(404).json({
            message: 'error total orders',
        })
    }
    res.status(200).json({
        success: true,
        totalOrders
    })

}

exports.totalSales = async (req, res, next) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice" }
            }
        }
    ])
    if (!totalSales) {
        return res.status(404).json({
            message: 'error total sales',
        })
    }
    res.status(200).json({
        success: true,
        totalSales
    })
}

exports.customerSales = async (req, res, next) => {
    const customerSales = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            },
        },
        // {
        //     $group: {
        //         _id: "$user",
        //         total: { $sum: "$totalPrice" },
        //     }
        // },

        { $unwind: "$userDetails" },
        // {
        //     $group: {
        //         _id: "$user",
        //         total: { $sum: "$totalPrice" },
        //         doc: { "$first": "$$ROOT" },

        //     }
        // },

        // {
        //     $replaceRoot: {
        //         newRoot: { $mergeObjects: [{ total: '$total' }, '$doc'] },
        //     },
        // },
        {
            $group: {
                _id: "$userDetails.name",
                total: { $sum: "$totalPrice" }
            }
        },
        // {
        //     $project: {
        //         _id: 0,
        //         "userDetails.name": 1,
        //         total: 1,
        //     }
        // },
        { $sort: { total: -1 } },

    ])
    console.log(customerSales)
    if (!customerSales) {
        return res.status(404).json({
            message: 'error customer sales',
        })
    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        customerSales
    })

}
exports.salesPerMonth = async (req, res, next) => {
    const salesPerMonth = await Order.aggregate([
        {
            $group: {
                // _id: {month: { $month: "$paidAt" } },
                _id: {
                    year: { $year: "$paidAt" },
                    month: { $month: "$paidAt" }
                },
                total: { $sum: "$totalPrice" },
            },
        },

        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ' Sept', 'Oct', 'Nov', 'Dec']
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', "$_id.month"]
                        }
                    }
                }
            }
        },
        { $sort: { "_id.month": 1 } },
        {
            $project: {
                _id: 0,
                month: 1,
                total: 1,
            }
        }

    ])
    if (!salesPerMonth) {
        return res.status(404).json({
            message: 'error sales per month',
        })
    }
    // return console.log(customerSales)
    res.status(200).json({
        success: true,
        salesPerMonth
    })

}