// authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import ResetToken from '../models/resetToken.js';
import sendResetEmail  from '../utils/emailService.js';
import Admin from '../models/Admin.js';


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  console.log('Forgot password request received:', req.body);  // Debugging line
  try {
    const { email } = req.body;
    // Your logic to handle the password reset
    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Failed to send password reset link.' });
  }
};



export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Find token in database
    const resetTokenDoc = await ResetToken.findOne({
      createdAt: { $gt: Date.now() - 3600000 } // Token shouldn't be expired
    });

    if (!resetTokenDoc) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Verify token
    const isValid = await bcrypt.compare(token, resetTokenDoc.token);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find token in database
    const resetTokenDoc = await ResetToken.findOne({
      createdAt: { $gt: Date.now() - 3600000 } // Token shouldn't be expired
    });

    if (!resetTokenDoc) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Verify token
    const isValid = await bcrypt.compare(token, resetTokenDoc.token);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await User.findByIdAndUpdate(resetTokenDoc.userId, {
      password: hashedPassword
    });

    // Delete used reset token
    await ResetToken.deleteOne({ _id: resetTokenDoc._id });

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};