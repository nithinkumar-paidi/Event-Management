
import Booking from '../models/CampaingBooking.js';
import Service from '../models/Services.js';
import Place from '../models/Place.js';

export const getStats = async (req, res) => {
  try {
    const [totalBookings, totalServices, totalPlaces] = await Promise.all([
      Booking.countDocuments(),
      Service.countDocuments(),
      Place.countDocuments()
    ]);
    
    res.status(200).json({
      totalBookings,
      totalServices,
      totalPlaces,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(200).json({ success: true, data: "Stats data" });
  }
};