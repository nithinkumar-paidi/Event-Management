// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './router/bookingRoutes.js';
import MessageRoutes from './router/messageRoutes.js';
import adminRoutes from './router/adminRoute.js';
import authRoutes from './router/authRoutes.js';
import Admin from './models/Admin.js';
import EventRoutes from './router/eventRoutes.js'
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();


// Validate essential environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not defined in environment variables`);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow necessary methods
  credentials: true, // If cookies or auth headers are used
};
app.use(cors(corsOptions));


// Setup initial admin account
const setupAdmin = async () => {
  try {
    console.log('Checking for existing admin...');
    let admin = await Admin.findOne({ email: 'nithinpaidi3@gmail.com' });
    
    if (!admin) {
      console.log('Creating new admin account...');
      admin = await Admin.create({
        name: 'Nithin',
        email: 'nithinpaidi3@gmail.com',
        password: 'Nithin3425',
        role: 'admin'
      });
      console.log('Admin account created successfully:', admin.email);
    } else {
      // Reset password for existing admin
      console.log('Resetting existing admin password...');
      admin.password = 'Nithin3425';
      await admin.save();
      console.log('Admin password reset successfully');
    }
  } catch (error) {
    console.error('Error in setupAdmin:', error);
    throw error;
  }
};

// Routes
app.use('/api/v1/message', MessageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes); // Make sure this matches the axios baseURL
app.use('/api/admin', EventRoutes);
app.use('/api/admin/v1/auth', authRoutes); // Use a unique base path like `/api/v1/auth`



// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

const startServer = async () => {
  try {
    // Connect to MongoDB
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error('Failed to connect to MongoDB. Server will not start.');
      process.exit(1);
    }
    
    // Setup admin account
    await setupAdmin();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

startServer();

export default app;