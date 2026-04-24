import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookingRoutes from './routes/bookingRoutes.js';
import franchiseRoutes from './routes/franchiseRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://start.arunlive.com"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/book', bookingRoutes);
app.use('/api/franchise', franchiseRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Startup Cafe API is running.' });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
