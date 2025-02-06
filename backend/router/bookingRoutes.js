
import express from 'express';
import auth from '../Middleware/auth.js';
import * as bookingController from '../controllers/bookingController.js';

const router = express.Router();

// Public routes
router.post('/create-booking', bookingController.createBooking);
router.get('/bookings/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: error.message
    });
  }
});

// Admin routes
router.get('/admin/bookings', bookingController.getAllBookings);
router.patch('/admin/bookings/:bookingId/accept', bookingController.acceptBooking);
router.patch('/admin/bookings/:bookingId/reject', bookingController.rejectBooking);

// Authenticated user routes
router.get('/user', auth, bookingController.getUserBookings);
router.put('/:id', auth, bookingController.updateBooking);
router.delete('/:id', auth, bookingController.deleteBooking);

export default router;