import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { getStats } from '../controllers/statscontroller.js';
import { getAllServices, addService, deleteService } from '../controllers/serviceController.js';
import { getAllBookings, acceptBooking, rejectBooking } from '../controllers/bookingController.js';
import { getAllEvents, addEvent, updateEvent, deleteEvent } from '../controllers/EventController.js';
import Admin from '../models/Admin.js'; // Ensure this is the correct path to your Admin model
import sendResetEmail from '../utils/emailService.js';  // Correct path if file is in 'backend/utils/'
import crypto from 'crypto';  // Using crypto to generate a random reset token

const router = express.Router();

// Auth routes
router.post('/login', loginAdmin);

// Stats routes
router.get('/stats', getStats);

// Service routes
router.get('/places', (req, res) => {
  // Dummy response for places
  res.json({ message: 'Places data' });
});
router.get('/services', getAllServices); // Add this route
router.post('/services', addService);
router.delete('/services/:id', deleteService);

// Booking routes
router.get('/bookings', getAllBookings);
router.patch('/bookings/:bookingId/accept', acceptBooking);
router.patch('/bookings/:bookingId/reject', rejectBooking);

// Event routes
router.get('/events/:type', getAllEvents); // Fetch events by type
router.post('/events/:type', addEvent);    // Add a new event by type
router.patch('/events/:id', updateEvent); // Update an event by ID
router.delete('/events/:id', deleteEvent);// Delete an event by ID

// Forgot Password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if admin exists with the provided email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found with this email.' });
    }

    // Generate a reset token (you can use crypto or jwt for this purpose)
    const resetToken = crypto.randomBytes(20).toString('hex');  // Generate a random token
    // Optionally save this reset token in the database or cache with an expiration time
    // admin.resetToken = resetToken;  // Save in database if needed
    // admin.resetTokenExpiry = Date.now() + 3600000;  // Expire in 1 hour
    // await admin.save();

    // Send password reset email
    const emailSent = await sendResetEmail(email, resetToken);

    if (emailSent) {
      return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } else {
      return res.status(500).json({ message: 'Failed to send reset email. Try again later.' });
    }
  } catch (err) {
    console.error('Error during forgot password:', err);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
