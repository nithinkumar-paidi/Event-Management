import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Calendar, Phone, Info, Sun } from 'lucide-react';
import BookingModal from '../components/Booking/BookingModal';
import './PlaceOverview.css';

const PlaceOverview = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const messageRef = useRef(null); // Ref to the popup message

  const location = useLocation();
  const place = location.state?.place;

  // Scroll to the popup message when bookingMessage changes
  useEffect(() => {
    if (bookingMessage && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [bookingMessage]);

  const handleBookingSuccess = (message) => {
    setBookingMessage(message);
    setTimeout(() => {
      setBookingMessage('');
    }, 5000);
  };

  if (!place) {
    return <div className="not-found">Place not found</div>;
  }

  return (
    <div className="min-h-screen bg-wrapper">
      {bookingMessage && (
        <div className="popup-message-overlay" ref={messageRef}>
          <div className="popup-message">
            {bookingMessage}
            <button className="close-popup" onClick={() => setBookingMessage('')}>
              ×
            </button>
          </div>
        </div>
      )}

      <div className="place-overview-container">
        <div className="main-grid">
          <div className="image-gallery-section">
            <div className="main-image-container">
              <img
                src={place.images[selectedImageIndex]?.url || '/api/placeholder/800/500'}
                alt={place.images[selectedImageIndex]?.alt || place.name}
                className="main-image"
              />
              <div className="image-overlay">
                <h2 className="image-title">{place.name}</h2>
              </div>
            </div>
            <div className="thumbnail-container">
              {place.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url || '/api/placeholder/120/80'}
                  alt={img.alt}
                  className={`thumbnail ${selectedImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          <div className="place-details-section">
            <h1 className="place-title">{place.name}</h1>
            <div className="location-info">
              <MapPin className="icon" />
              <span>{place.location}</span>
            </div>
            <p className="description">{place.description}</p>

            <div className="price-section">
              <div className="price">{place.price}</div>
              <div className="guests-info">Maximum Guests: {place.maxGuests}</div>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <Calendar className="icon" />
                <div>
                  <h3 className="info-title">Check-in/out</h3>
                  <p className="info-text">
                    In: {place.checkInTime}<br />
                    Out: {place.checkOutTime}
                  </p>
                </div>
              </div>
              <div className="info-card">
                <Sun className="icon" />
                <div>
                  <h3 className="info-title">Weather</h3>
                  <p className="info-text">{place.weatherInfo}</p>
                </div>
              </div>
            </div>

            <div className="emergency-section">
              <h2 className="section-title">Emergency Information</h2>
              <div className="emergency-info">
                <Phone className="icon emergency" />
                <span>{place.emergencyInfo.nearestHospital}</span>
              </div>
              <div className="emergency-info">
                <Info className="icon" />
                <span>Cell Service: {place.emergencyInfo.cellService}</span>
              </div>
            </div>

            <button className="book-button" onClick={() => setIsModalOpen(true)}>
              Book Now
            </button>
            <BookingModal
              place={place}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onBookingSuccess={handleBookingSuccess} // Pass success callback
            />
          </div>
        </div>

        <div className="features-grid">
          <div className="amenities-section">
            <h2 className="section-title">Amenities</h2>
            <div className="features-list">
              {place.amenities?.map((amenity, idx) => (
                <div key={idx} className="feature-item">
                  <div className="dot amenity" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rules-section">
            <h2 className="section-title">Rules</h2>
            <div className="features-list">
              {place.rules?.map((rule, idx) => (
                <div key={idx} className="feature-item">
                  <div className="dot rule" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="host-section">
          <h2 className="section-title">Your Host</h2>
          <div className="host-info">
            <img
              src={place.host.image || '/api/placeholder/64/64'}
              alt={place.host.name}
              className="host-image"
            />
            <div>
              <h3 className="host-name">{place.host.name}</h3>
              <p className="host-description">{place.host.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOverview;
