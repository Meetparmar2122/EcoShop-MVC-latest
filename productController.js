const Product = require('../models/productModel');

// Render list page
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('products', { products, title: 'EcoShop Products' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (form submit or JSON POST)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: 'name and price are required' });
    }
    const product = new Product({
      name,
      description: description || '',
      price: Number(price),
      stock: Number(stock) || 0,
      category: category || 'General',
    });
    await product.save();

    // If request expects HTML, redirect; if JSON, return created document
    const acceptsHTML = req.headers.accept && req.headers.accept.includes('text/html');
    if (acceptsHTML) return res.redirect('/products');
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// JSON API: get products
exports.getProductsJson = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const acceptsHTML = req.headers.accept && req.headers.accept.includes('text/html');
    if (acceptsHTML) return res.redirect('/products');
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
