import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ place, onClose, isOpen, onBookingSuccess }) => {
  const [bookingData, setBookingData] = useState({
    placeName: place?.name || '',
    placeId: place?.id || '',
    checkInDate: '',
    checkOutDate: '',
    customerName: '',
    email: '',
    phone: '',
    totalGuests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/bookings/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert(errorData.message || 'Booking failed. Please try again.');
        return;
      }
      
      const data = await response.json();

      if (data.success) {
        onBookingSuccess('Booking successful!'); // Trigger the success message in PlaceOverview
        onClose();
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      alert('Error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Book {place?.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Check-in Date</label>
            <input
              type="date"
              name="checkInDate"
              value={bookingData.checkInDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={bookingData.checkOutDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="customerName"
              value={bookingData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={bookingData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Guests</label>
            <input
              type="number"
              name="totalGuests"
              min="1"
              value={bookingData.totalGuests}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
