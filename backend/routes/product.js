const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProduct, updateProduct, deleteProduct, getProducts, getSingleProduct, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles }=require('../middlewares/auth');


router.get('/products', getProducts)
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/product/new', upload.array('images', 10), newProduct);

router.get('/admin/products', getAdminProducts);
router.route('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin',)).put(updateProduct).delete(deleteProduct);
//router.post('/admin/product/new', isAuthenticatedUser, upload.array('images', 10), newProduct);

module.exports = router;