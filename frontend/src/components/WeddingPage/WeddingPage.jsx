import React, { useState } from 'react';
import './WeddingPage.css';
import weddingData from '../../data/weddingData.json';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Camera, 
  Music, 
  Utensils,
  Users,
  CreditCard,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle 
} from 'lucide-react';

const WeddingPage = () => {
  const {
    heroSection,
    coupleSection,
    storySection,
    eventDetails,
    gallery,
    services,
    rsvpSection,
    registrySection,
    testimonials,
    bookingSection
  } = weddingData;

  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bookingDetails = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      packageType: selectedPackage || formData.get("packageType"),
      numberOfGuests: formData.get("numberOfGuests"),
      specialRequirements: formData.get("specialRequirements"),
      dietaryRestrictions: formData.get("dietaryRestrictions"),
    };

    console.log("Booking Details:", bookingDetails);
    setBookingData(bookingDetails);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
  };


  return (
    <div className="wedding-container">
    {/* Hero Section */}
    <section className="hero-section" style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{heroSection.title}</h1>
          <p className="date">{heroSection.date}</p>
          <p className="location">{heroSection.location}</p>
        </div>
      </div>
    </section>

      {/* Couple Section */}
      <section className="couple-section">
        <h2 className="section-title">The Happy Couple</h2>
        <div className="couple-container">
          <div className="person-card">
            <img src={coupleSection.bride.image} alt="Bride" />
            <h3>{coupleSection.bride.name}</h3>
            <p>{coupleSection.bride.description}</p>
          </div>
          <div className="heart-divider">
            <Heart size={48} />
          </div>
          <div className="person-card">
            <img src={coupleSection.groom.image} alt="Groom" />
            <h3>{coupleSection.groom.name}</h3>
            <p>{coupleSection.groom.description}</p>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="story-section">
        <h2 className="section-title">Our Love Story</h2>
        <div className="timeline">
          {storySection.timeline.map((event, index) => (
            <div className="timeline-event" key={index}>
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <img src={event.image} alt={event.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details Section */}
      <section className="events-section">
        <h2 className="section-title">Wedding Events</h2>
        <div className="events-grid">
          {eventDetails.events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-icon">
                {event.type === 'ceremony' ? <Heart /> : <Music />}
              </div>
              <h3>{event.name}</h3>
              <div className="event-details">
                <p><Calendar size={16} /> {event.date}</p>
                <p><MapPin size={16} /> {event.location}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-title">Photo Gallery</h2>
        <div className="gallery-grid">
          {gallery.images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img src={image.url} alt={image.caption} />
              <div className="image-caption">{image.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Wedding Services</h2>
        <div className="services-grid">
          {services.vendors.map((vendor, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                {vendor.type === 'photography' ? <Camera /> :
                 vendor.type === 'catering' ? <Utensils /> :
                 vendor.type === 'music' ? <Music /> : <Heart />}
              </div>
              <h3>{vendor.name}</h3>
              <p>{vendor.description}</p>
              <a href={vendor.website} className="vendor-link">Learn More</a>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP Section */}
      <section className="rsvp-section" style={{ backgroundImage: `url(${rsvpSection.backgroundImage})` }}>
        <div className="rsvp-overlay">
          <h2 className="section-title">RSVP</h2>
          <p>{rsvpSection.description}</p>
          <button className="rsvp-button">Respond Now</button>
          <p className="rsvp-deadline">Please RSVP by {rsvpSection.deadline}</p>
        </div>
      </section>

      {/* Registry Section */}
      <section className="registry-section">
        <h2 className="section-title">Gift Registry</h2>
        <p className="registry-intro">{registrySection.description}</p>
        <div className="registry-grid">
          {registrySection.registries.map((registry, index) => (
            <a href={registry.link} className="registry-card" key={index}>
              <img src={registry.logo} alt={registry.name} />
              <h3>{registry.name}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Wishes from Loved Ones</h2>
        <div className="testimonials-grid">
          {testimonials.wishes.map((wish, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{wish.message}"</p>
              <div className="testimonial-author">
                <img src={wish.authorImage} alt={wish.author} />
                <h4>{wish.author}</h4>
                <p>{wish.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
       {/* Booking Section */}
       <section className="booking-section">
        <h2 className="section-title">{bookingSection.title}</h2>
        <p className="booking-subtitle">{bookingSection.subtitle}</p>

        {/* Packages Grid */}
        <div className="packages-grid">
          {bookingSection.packages.map((pkg, index) => (
            <div
              className={`package-card ${selectedPackage === pkg.name ? 'selected' : ''} ${bookingData ? 'booked' : ''}`}
              key={index}
              onClick={() => handlePackageSelect(pkg.name)}
            >
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-price">{pkg.price}</div>
              <ul className="package-features">
                {pkg.includes.map((feature, idx) => <li key={idx}>{feature}</li>)}
              </ul>
              <p className="max-guests">
                <Users size={16} /> Max Guests: {pkg.maxGuests}
              </p>
              <button className="book-now-button">{bookingData ? "Booked" : "Select Package"}</button>
            </div>
          ))}
        </div>

        {/* Booking Form with Background Image */}
        <div className="booking-form-wrapper">
          <div className="booking-form-container">
            <h3>Reserve Your Place</h3>
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              {bookingSection.formFields.map((field, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea id={field.id} name={field.id} required={field.required} placeholder={`Enter ${field.label.toLowerCase()}`} />
                  ) : field.type === 'select' ? (
                    <select id={field.id} name={field.id} required={field.required} defaultValue="">
                      <option value="" disabled>Select a package</option>
                      {bookingSection.packages.map((pkg, idx) => (
                        <option key={idx} value={pkg.name}>{pkg.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input type={field.type} id={field.id} name={field.id} required={field.required} placeholder={`Enter ${field.label.toLowerCase()}`} />
                  )}
                </div>
              ))}
              <button type="submit" className="submit-booking">Book Now</button>
            </form>
          </div>
        </div>
      </section>
      {/* Booking Confirmation Overlay */}
      {showOverlay && (
        <div className="booking-confirmation-overlay">
          <div className="booking-message">
            <CheckCircle size={48} color="#ffcc00" />
            <h3>Booking Confirmed!</h3>
            <p>Thank you for reserving your spot!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingPage;