const Order = require('../models/order'); 
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
  try {
    const { products, total, status } = req.body; 
    const order = new Order({ products, total, status });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Failed to create an order:', error);
    res.status(500).json({ message: 'Failed to create an order' });
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; 
  const { status } = req.body; 

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Failed to update the order status:', error);
    res.status(500).json({ message: 'Failed to update the order status' });
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
