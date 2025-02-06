import React, { useState, useEffect } from 'react';
import { anniversaryData } from '../../data/anniversaryData.js';
import { Star, Heart, Clock, Gift, MapPin } from 'lucide-react';
import './AnniversaryPlanning.css';

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === anniversaryData.heroCarousel.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel">
      {anniversaryData.heroCarousel.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${
            currentSlide === index ? 'carousel-slide__visible' : 'carousel-slide__hidden'
          }`}
        >
          <img
            src={slide.image}
            alt={`Anniversary Celebration ${index + 1}`}
            className="carousel-image"
          />
          <div className="carousel-overlay">
            <p className="carousel-quote">{slide.quote}</p>
          </div>
        </div>
      ))}
      <div className="carousel-dots">
        {anniversaryData.heroCarousel.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              currentSlide === index ? 'carousel-dot__active' : 'carousel-dot__inactive'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, onSelect, isSelected, isBooked }) => (
  <div
    className={`package-card ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
    onClick={() => !isBooked && onSelect(pkg.id)}
  >
    <img src={pkg.image} alt={pkg.title} className="package-image" />
    <div className="package-content">
      <h3 className="package-title">{pkg.title}</h3>
      <p className="package-description">{pkg.description}</p>
      <div className="package-rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="star-icon" fill="#FFD700" />
        ))}
      </div>
      <ul className="package-features">
        {pkg.features.map((feature, index) => (
          <li key={index} className="package-feature">
            <Heart className="feature-icon" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="package-price">${pkg.price}</p>
      <button className="book-button" disabled={isBooked}>
        {isBooked ? 'Booked' : isSelected ? 'Selected' : 'Select Package'}
      </button>
    </div>
  </div>
);// Booking Section
const BookingSection = ({ selectedPackage, onBook }) => (
  <section className="booking-section">
    <h2 className="section-title">Reserve Your Celebration</h2>
    {selectedPackage ? (
      <div className="booking-confirmation">
        <p>You have selected: <strong>{selectedPackage.title}</strong></p>
        <button className="confirm-booking-button" onClick={onBook}>
          Confirm Booking
        </button>
      </div>
    ) : (
      <p className="no-package-selected">Please select a package to book.</p>
    )}
  </section>
);


// Resort Features Section Component
const ResortFeatures = () => (
  <section className="resort-features">
    <h2 className="section-title">Resort Amenities</h2>
    <div className="features-grid">
      {anniversaryData.resortFeatures.map((feature, index) => (
        <div key={index} className="feature-card">
          <img src={feature.image} alt={feature.title} className="feature-image" />
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

// Celebration Timeline Component
const CelebrationTimeline = () => (
  <section className="timeline-section">
    <h2 className="section-title">Your Perfect Day</h2>
    <div className="timeline">
      <div className="timeline-item">
        <Clock className="timeline-icon" />
        <h3>Arrival & Check-in</h3>
        <p>Welcome champagne and resort tour</p>
      </div>
      <div className="timeline-item">
        <Gift className="timeline-icon" />
        <h3>Special Surprises</h3>
        <p>Room decoration and anniversary gifts</p>
      </div>
      <div className="timeline-item">
        <MapPin className="timeline-icon" />
        <h3>Evening Celebration</h3>
        <p>Romantic dinner under the stars</p>
      </div>
    </div>
  </section>
);

// Gallery Section Component (uses JSON data)
const GallerySection = () => (
  <section className="gallery-section">
    <h2 className="section-title">Gallery</h2>
    <div className="gallery-grid">
      {anniversaryData.gallery.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image.url} alt={image.caption} className="gallery-image" />
          <div className="gallery-caption">{image.caption}</div>
        </div>
      ))}
    </div>
  </section>
);

// Enhanced Booking Form Component
const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    names: { primary: '', secondary: '' },
    email: '',
    phone: '',
    date: '',
    occasion: 'anniversary',
    years: '',
    preferences: {
      dining: '',
      activities: [],
      specialRequests: ''
    },
    addons: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="booking-section">
      <h2 className="section-title">Book Your Celebration</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              required
              value={formData.names.primary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  names: { ...formData.names, primary: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Partner's Name</label>
            <input
              type="text"
              required
              value={formData.names.secondary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  names: { ...formData.names, secondary: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Anniversary Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Years Celebrating</label>
            <input
              type="number"
              value={formData.years}
              onChange={(e) =>
                setFormData({ ...formData, years: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dining Preferences</label>
          <select
            value={formData.preferences.dining}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, dining: e.target.value }
              })
            }
          >
            <option value="">Select Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Services</label>
          <div className="checkbox-group">
            {['Photography', 'Spa Treatment', 'Room Decoration', 'Live Music'].map((addon) => (
              <label key={addon} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.addons.includes(addon)}
                  onChange={(e) => {
                    const updatedAddons = e.target.checked
                      ? [...formData.addons, addon]
                      : formData.addons.filter(item => item !== addon);
                    setFormData({ ...formData, addons: updatedAddons });
                  }}
                />
                {addon}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            value={formData.preferences.specialRequests}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferences: { ...formData.preferences, specialRequests: e.target.value }
              })
            }
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Confirm Booking
        </button>
      </form>
    </section>
  );
};

// Main Anniversary Page Component
const AnniversaryPage = () => {
  const [packages, setPackages] = useState(anniversaryData.packages);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [bookedPackageId, setBookedPackageId] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false); // ✅ FIXED: Added this line

  const handleSelectPackage = (id) => {
    setSelectedPackageId(id);
  };

  const handleBooking = () => {
    setBookedPackageId(selectedPackageId);
    setSelectedPackageId(null);
    setBookingSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="anniversary-page">
      <HeroCarousel />
      
      <section className="packages-section">
        <h2 className="section-title">Anniversary Packages</h2>
        <div className="packages-grid">
          {anniversaryData.packages.map((pkg) => (
             <PackageCard
             key={pkg.id}
             pkg={pkg}
             onSelect={handleSelectPackage}
             isSelected={selectedPackageId === pkg.id}
             isBooked={bookedPackageId === pkg.id}
           />
         ))}
        </div>
      </section>

      <ResortFeatures />
      <CelebrationTimeline />
      
      {/* Gallery Section */}
      <GallerySection />

      <BookingForm onSubmit={handleBooking} />

      {bookingSuccess && (
        <div className="success-message">
          Booking confirmed! Thank you for choosing us.
        </div>
      )}
    </div>
  );
};

export default AnniversaryPage;
