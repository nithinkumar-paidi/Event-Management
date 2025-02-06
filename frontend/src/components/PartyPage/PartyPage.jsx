import React, { useState } from 'react';
import {
  Palette,
  UtensilsCrossed,
  Calendar,
  Users,
  DollarSign,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  Check
} from 'lucide-react'; import partyData from '../../data/partyData.json';

import './PartyPage.css';

const PartyPage = () => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guestCount: '',
    venue: '',
    package: '',
    additionalServices: [],
    specialRequirements: ''
  });

  const getIcon = (iconName) => {
    const icons = {
      Palette: <Palette size={24} />,
      UtensilsCrossed: <UtensilsCrossed size={24} />,
      Calendar: <Calendar size={24} />
    };
    return icons[iconName];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePackageSelect = (pkg) => {
    setSelectedPackages((prevPackages) => {
      // If package is already selected, remove it
      if (prevPackages.find((p) => p.id === pkg.id)) {
        return prevPackages.filter((p) => p.id !== pkg.id);
      }
      // Otherwise, add it
      return [...prevPackages, pkg];
    });
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = [...prev.additionalServices];
      if (services.includes(service)) {
        return {
          ...prev,
          additionalServices: services.filter(s => s !== service)
        };
      } else {
        return {
          ...prev,
          additionalServices: [...services, service]
        };
      }
    });
  };

  const handleVenueSelect = (venue) => {
    setFormData((prev) => ({
      ...prev,
      venue: venue.name, // Set selected venue in form data
    }));

    // Scroll to the booking form
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const finalBookingData = {
      ...formData,
      packages: selectedPackages.map(pkg => pkg.name), // Save selected packages
    };

    console.log("Booking submitted:", finalBookingData);

    setIsBookingComplete(true);
    setShowBookingModal(false);
  };
  ;



  return (
    <div className="party-page">
      {/* Hero Section */}
      <header
        className="hero"
        style={{ backgroundImage: `url(${partyData.hero.backgroundImage})` }}
      >
        <div className="hero-content">
          <h1>{partyData.hero.title}</h1>
          <p>{partyData.hero.subtitle}</p>
          <a href="#venues" className="cta-button">
            Explore Venues
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Our Special Features</h2>
        <div className="features-grid">
          {partyData.features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">
                {getIcon(feature.icon)}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Venues Section */}
      <section className="venues" id="venues">
        <h2>Our Venues</h2>
        <div className="venues-grid">
          {partyData.venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img src={venue.image} alt={venue.name} />
              <div className="venue-info">
                <h3>{venue.name}</h3>
                <p className="venue-description">{venue.description}</p>
                <div className="venue-details">
                  <span>
                    <Users size={16} />
                    {venue.capacity} guests
                  </span>
                  <span>
                    <DollarSign size={16} />
                    {venue.price}
                  </span>
                  <span>
                    <Star size={16} />
                    {venue.rating}
                  </span>
                </div>
                <ul className="venue-features">
                  {venue.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="book-button"
                  onClick={() => handleVenueSelect(venue)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <h2>Recent Celebrations</h2>
        <div className="gallery-grid">
          {partyData.gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.image} alt={item.title} />
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Packages Section */}
      <section className="packages" id="packages">
        <h2>Event Packages</h2>
        <div className="packages-grid">
          {partyData.packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-header">
                <h3>{pkg.name}</h3>
                <div className="package-price">{pkg.price}</div>
              </div>
              <p className="package-description">{pkg.description}</p>
              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={16} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="select-package-button"
                onClick={() => handlePackageSelect(pkg)}
                disabled={isBookingComplete && selectedPackages.some((p) => p.id === pkg.id)}
              >
                {isBookingComplete && selectedPackages.some((p) => p.id === pkg.id)
                  ? "Booked" // Show "Booked" only for the selected packages
                  : selectedPackages.some((p) => p.id === pkg.id)
                    ? "Remove Package"
                    : "Select Package"}
              </button>



            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          {partyData.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.event}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p className="testimonial-comment">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {partyData.faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeTab === faq.id ? 'active' : ''}`}
              onClick={() => setActiveTab(activeTab === faq.id ? null : faq.id)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <ChevronDown className={`faq-icon ${activeTab === faq.id ? 'rotate' : ''}`} />
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Get in Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={24} />
              <p>{partyData.contactInfo.phone}</p>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <p>{partyData.contactInfo.email}</p>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <p>{partyData.contactInfo.address}</p>
            </div>
            <div className="contact-item">
              <Clock size={24} />
              <p>{partyData.contactInfo.hours}</p>
            </div>
            <div className="social-media">
              <a href={`https://facebook.com/${partyData.contactInfo.socialMedia.facebook}`}>
                <Facebook size={24} />
              </a>
              <a href={`https://instagram.com/${partyData.contactInfo.socialMedia.instagram}`}>
                <Instagram size={24} />
              </a>
              <a href={`https://twitter.com/${partyData.contactInfo.socialMedia.twitter}`}>
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57929.23355645912!2d67.01519255!3d24.8441321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e70a31f45a9%3A0x25e252450977ec12!2sSaddar%20Town%2C%20Karachi%2C%20Sindh!5e0!3m2!1sen!2s!4v1709099958323!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
   width={1000}
   height={750}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>


      {/* Booking Form Section */}
      <section className="booking" id="book">
        {/* Background Video */}
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="/assets/party-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div> {/* Dark overlay for better readability */}
        </div>
        <div className="booking-content">
          <h2>Book Your Event</h2>
          <form className="booking-form" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Event Date */}
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Event Time */}
            <div className="form-group">
              <label>Event Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Guest Count */}
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                name="guestCount"
                placeholder="Number of Guests"
                value={formData.guestCount}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            {/* Venue Selection */}
            <div className="form-group">
              <label>Select Venue</label>
              <select
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a venue</option>
                {partyData.venues.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Packages (Automatically Filled) */}
            <div className="form-group">
              <label>Selected Packages</label>
              <div className="selected-packages">
                {selectedPackages.length > 0 ? (
                  <ul>
                    {selectedPackages.map((pkg) => (
                      <li key={pkg.id}>
                        <strong>{pkg.name}</strong> - {pkg.price}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No packages selected</p>
                )}
              </div>
            </div>

            {/* Additional Services */}
            <div className="form-group">
              <label>Additional Services</label>
              <div className="services-grid">
                {["DJ Services", "Photography", "Valet Parking", "Custom Decor"].map((service) => (
                  <label key={service} className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requirements */}
            <div className="form-group">
              <label>Special Requirements</label>
              <textarea
                name="specialRequirements"
                placeholder="Any special requirements?"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Submit Booking
            </button>
          </form>
        </div>
      </section>

      {isBookingComplete && (
        <div className="booking-confirmation">
          <h2> Booking Confirmed!</h2>
          <p>Thank you for booking your event. Here are your selected packages:</p>
          <ul>
            {selectedPackages.map((pkg) => (
              <li key={pkg.id}>
                <strong>{pkg.name}</strong> - {pkg.price}
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default PartyPage;