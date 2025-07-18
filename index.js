import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config(); // Load .env variables

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Home Page - API is running");
});

// Use environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log("✅ Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
