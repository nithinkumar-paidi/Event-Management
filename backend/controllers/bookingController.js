
import Booking from '../models/CampaingBooking.js';
import nodemailer from 'nodemailer';

export const createBooking = async (req, res) => {
  try {
    const { 
      placeName,
      placeId,
      checkInDate,
      checkOutDate,
      customerName,
      email,
      phone,
      totalGuests,
      type,
      details 
    } = req.body;

    // Validate required fields
    if (!placeName || !placeId || !checkInDate || !checkOutDate || !customerName || !email || !phone || !totalGuests) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required',
        missingFields: Object.entries({ 
          placeName, placeId, checkInDate, checkOutDate, customerName, email, phone, totalGuests 
        })
        .filter(([_, value]) => !value)
        .map(([key]) => key)
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();

    if (checkIn < today) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Create new booking
    const newBooking = new Booking({
      placeName,
      placeId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      customerName,
      email,
      phone,
      totalGuests: parseInt(totalGuests),
      status: 'pending',
      userId: req.user?.userId, // Optional chaining in case auth is not required
      type,
      details
    });

    // Save booking to database
    const savedBooking = await newBooking.save();

    // Send confirmation email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Booking Confirmation',
          text: `Dear ${customerName},\n\nYour booking for ${placeName} has been received.\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\n\nWe will review your booking and confirm shortly.\n\nThank you!`
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    res.status(201).json({ 
      success: true,
      message: 'Booking created successfully', 
      booking: savedBooking
    });

  } catch (error) {
    console.error('Booking Error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Internal server error while creating booking', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};

export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'accepted';
    await booking.save();

    await sendConfirmationEmail(booking);

    res.status(200).json({ message: 'Booking accepted', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'rejected';
    await booking.save();

    await sendRejectionEmail(booking);

    res.status(200).json({ message: 'Booking rejected', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendConfirmationEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Booking Confirmed',
    text: `Dear ${booking.customerName}, your booking has been confirmed.`,
  };

  await transporter.sendMail(mailOptions);
};

const sendRejectionEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Booking Rejected',
    text: `Dear ${booking.customerName}, unfortunately, your booking has been rejected.`,
  };

  await transporter.sendMail(mailOptions);
};
