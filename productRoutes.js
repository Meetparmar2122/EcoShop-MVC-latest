const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// View routes
router.get('/', productController.getAllProducts);

// API routes
router.get('/api', productController.getProductsJson);
router.post('/add', productController.createProduct);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
