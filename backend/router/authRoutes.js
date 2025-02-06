// authRoutes.js
import express from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  verifyResetToken, 
  resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token/verify', verifyResetToken);
router.post('/reset-password/:token', resetPassword);

export default router;