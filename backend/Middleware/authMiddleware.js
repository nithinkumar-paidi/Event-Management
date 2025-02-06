// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js'; // Assuming you have a User model

// Middleware to verify token and attach user or admin to the request
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check for admin or user based on roles
      let account = await Admin.findById(decoded.id).select('-password');
      if (!account) {
        account = await User.findById(decoded.id).select('-password');
        if (!account) {
          return res.status(401).json({ message: 'Authorization failed: User or Admin not found.' });
        }
      }

      // Attach account (user or admin) to the request
      req.account = account; // Generic field for both User and Admin
      req.role = account.role || (account instanceof Admin ? 'admin' : 'user');
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid or expired token.' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ message: 'Server error in authentication middleware.' });
  }
};

// Middleware to restrict access based on roles
export const authorizeRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
    next();
  };
};
