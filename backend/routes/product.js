const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Product = require('../models/product');
const {
  newProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getAdminProduct,
  getSingleProduct,
  productSales
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/product/new', upload.array('images'), newProduct);

router.get('/admin/product', getAdminProduct);
router.get('/admin/product-sales', productSales);

router.patch('/product/:id', async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock: stock },
      { new: true }
    );


    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
