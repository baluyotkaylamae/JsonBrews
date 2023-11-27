const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Product = require('../models/product');
const {
  newProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getAdminProduct,
  getSingleProduct,
  getProductById,
  productSales
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.get('/product/:id', getProductById);


//admin
router.put('/admin/update/product/:id', isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete('/admin/delete/product/:id',  deleteProduct);
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), newProduct);
router.get('/admin/product', isAuthenticatedUser, authorizeRoles("admin"), getAdminProduct);

router.get('/admin/product-sales',  productSales);
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
