// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config'; // Load environment variables
import { fileURLToPath } from 'url';

// File and directory utilities for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow this URL
    allowedHeaders: 'Content-Type,Authorization',
}));

// DB connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Serve images from uploads folder
app.use('/images', express.static('uploads'));

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
