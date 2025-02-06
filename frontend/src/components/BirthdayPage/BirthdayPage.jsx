import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Gift, 
  Calendar, 
  Camera, 
  Music, 
  X,
  MapPin,
  Mail
} from 'lucide-react';
import birthdayData from '../../data/birthdaydata.json';
import Clock from './Clock'; 
import './BirthdayPage.css';

const BirthdayPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const IMAGES_PER_LOAD = 4; // Number of images to load each time
  const photosPerPage = 3;

  const bannerSectionRef = useRef(null); // Reference for Banner Section
  const photosSectionRef = useRef(null); // Reference for Photos Section
  const servicesSectionRef = useRef(null); // Reference for Services Section
  const serviceGalleryRef = useRef(null); // Reference for Service Gallery Section
  const observerRef = useRef(null); // For Intersection Observer

  // Scroll to the banner section when the component mounts
  useEffect(() => {
    bannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageElement = entry.target;
            const index = parseInt(imageElement.dataset.index);

            // Add visible class to trigger animation
            setTimeout(() => {
              imageElement.classList.add('visible');
            }, index % IMAGES_PER_LOAD * 200); // Stagger effect

            // Stop observing after animation
            observerRef.current.unobserve(imageElement);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Load more images when scrolling
  const loadMoreImages = () => {
    if (!selectedService) return;

    const nextBatch = selectedService.galleryImages.slice(
      loadedImageCount,
      loadedImageCount + IMAGES_PER_LOAD
    );

    if (nextBatch.length > 0) {
      setVisibleImages((prev) => [...prev, ...nextBatch]);
      setLoadedImageCount((prev) => prev + IMAGES_PER_LOAD);
    }
  };

  // Handle scroll detection for loading more images
  useEffect(() => {
    const handleScroll = () => {
      if (!serviceGalleryRef.current) return;

      const rect = serviceGalleryRef.current.getBoundingClientRect();
      const isBottom = rect.bottom <= window.innerHeight + 100;

      if (isBottom && selectedService && loadedImageCount < selectedService.galleryImages.length) {
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedService, loadedImageCount]);

  // Reset images when selecting new service
  useEffect(() => {
    if (selectedService) {
      setVisibleImages(selectedService.galleryImages.slice(0, IMAGES_PER_LOAD));
      setLoadedImageCount(IMAGES_PER_LOAD);
    }
  }, [selectedService]);

  // Observe new images as they're added to DOM
  useEffect(() => {
    const images = document.querySelectorAll('.gallery-card:not(.visible)');
    images.forEach((img) => {
      if (observerRef.current) {
        observerRef.current.observe(img);
      }
    });
  }, [visibleImages]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setVisibleImages([]);
    setLoadedImageCount(0);
    setTimeout(() => {
      serviceGalleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Calculate gallery pagination
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = birthdayData.recentPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(birthdayData.recentPhotos.length / photosPerPage);

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % birthdayData.bannerSlides.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Function to get appropriate icons for services
  const getServiceIcon = (title) => {
    const icons = {
      decorations: <Music className="service-icon" />,
      // catering: <Calendar className="service-icon" />,
      photography: <Camera className="service-icon" />,
      catering: <Music className="service-icon" />,
    };
    return icons[title.toLowerCase()] || <Gift className="service-icon" />;
  };

  // Function to handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="birthday-page">
      {/* Banner Section */}
      <div className="banner-section" ref={bannerSectionRef}>
        <div className="banner-container">
          {birthdayData.bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`banner-slide ${currentSlide === index ? 'active' : ''}`}
              style={{
                left: `${index * 100}%`,
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <img
                src={slide.image}
                alt={slide.message}
                className="banner-image"
                onError={(e) => {
                  e.target.src = '/assets/default-banner.jpg';
                }}
              />
              <div className="banner-content">
                <h1 className="banner-title">{slide.message}</h1>
                <p className="banner-subtitle">{slide.subtext}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="banner-nav-button prev"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev - 1 + birthdayData.bannerSlides.length) % birthdayData.bannerSlides.length
            )
          }
        >
          <ChevronLeft />
        </button>
        <button className="banner-nav-button next" onClick={nextSlide}>
          <ChevronRight />
        </button>
      </div>

      {/* Services Section */}
      <section className="services-section" ref={servicesSectionRef}>
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {birthdayData.services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              {getServiceIcon(service.title)}
              <h3 className="service-title">{service.title}</h3>
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
                onError={(e) => (e.target.src = '/assets/default-service.jpg')}
              />
            </div>
          ))}
        </div>
      </section>


         {/* Service Gallery Section */}
      {selectedService && (
        <section className="service-gallery" ref={serviceGalleryRef}>
          <h2 className="section-title">{selectedService.title} Gallery</h2>
          <div className="gallery-grid">
            {visibleImages.map((image, index) => (
              <div
                key={`${selectedService.id}-${index}`}
                className="gallery-card"
                data-index={index}
              >
                <div className="image-wrapper">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="gallery-image"
                    onClick={() => setSelectedImage(image.url)}
                    onError={(e) => {
                      e.target.src = '/assets/default-photo.jpg';
                    }}
                  />
                  <div className="image-overlay">
                    <span className="image-description">{image.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {loadedImageCount < (selectedService.galleryImages?.length || 0) && (
            <div className="load-more-indicator">
              <div className="loading-spinner"></div>
            </div>
          )}
        </section>
      )}


      {/* Photos Section */}
      <section className="photos-section" ref={photosSectionRef}>
        <h2 className="section-title">Gallery</h2>
        <div className="photos-grid">
          {currentPhotos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.image}
                alt={photo.title}
                className="photo-image"
                onClick={() => {
                  setSelectedImage(photo.image);
                  scrollToSection(photosSectionRef);
                }}
                onError={(e) => (e.target.src = '/assets/baby.jpg')}
              />
              <p className="photo-title">{photo.title}</p>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              <ChevronRight />
            </button>
          </div>
        )}
      </section>


        {/* New Testimonials Section */}
        <section className="testimonials-section">
        <h2 className="section-title">Happy Customers</h2>
        <div className="testimonials-grid">
          {birthdayData.testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                    onError={(e) => (e.target.src = '/assets/default-avatar.jpg')}
                  />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-date">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {birthdayData.faqs?.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Contact Form Section */}
      <section className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <Clock className="info-icon" />
              <div>
                <h4>Business Hours</h4>
                <p>Mon-Sat: 9AM - 7PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>123 Party Street</p>
                <p>Celebration City, ST 12345</p>
              </div>
            </div>
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h4>Email Us</h4>
                <p>info@birthdayevents.com</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              className="form-input"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="form-input"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="form-input"
            />
            <textarea
              placeholder="Your Message"
              className="form-textarea"
              rows={4}
            />
            <button type="submit" className="form-submit-button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* New Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-company">
            <h3 className="footer-title">Birthday Events</h3>
            <p className="footer-description">
              Creating memorable celebrations for your special day
            </p>
          </div>
        </div>
      </footer>

    {/* CTA Section */}
      <section className="cta-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="cta-title">Book Your Dream Birthday Event!</h2>
          <p className="cta-subtitle">
            Let us create an unforgettable celebration filled with joy and happiness!
          </p>
          <button className="cta-button">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default BirthdayPage;
