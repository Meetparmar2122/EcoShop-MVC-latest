require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');             // Added: HTTP server
const socketio = require('socket.io');    // Added: Socket.IO
const productRoutes = require('./routes/productRoutes');

const app = express();
const server = http.createServer(app);     // Create HTTP server from Express app
const io = socketio(server);               // Attach Socket.IO to the server

// Settings
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecoshop';

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.redirect('/products'));
app.use('/products', productRoutes);

// --- Socket.IO Logic ---
io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });

  // Emit a random number every second to this client
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

// --- Database + Server start ---
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, () => console.log(`🚀 Server + Socket running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
