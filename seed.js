require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecoshop';

const sample = [
  { name: 'Reusable Bamboo Toothbrush', description: 'Eco-friendly bamboo toothbrush', price: 4.99, stock: 120, category: 'Personal Care' },
  { name: 'Stainless Steel Water Bottle', description: 'Keeps drinks cold for 24h', price: 24.5, stock: 40, category: 'Accessories' },
  { name: 'Organic Cotton Tote', description: 'Reusable shopping bag', price: 12.0, stock: 80, category: 'Bags' },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected. Seeding...');
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log('Seeded:', sample.length, 'products');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
