const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProduct, 
    updateProduct, 
    deleteProduct, 
    getProducts,
    getProductById,
    getAdminProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles }=require('../middlewares/auth');

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/product/new', upload.array('images'), newProduct);

router.get('/admin/product', getAdminProduct);
//router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);
//router.post('/admin/product/new', upload.array('images'), newProduct);

module.exports = router;