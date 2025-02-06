import React from 'react';
import './GameNightPage.css';
import gameNightData from '../../data/gameNightData.json';
import { Users, Coffee, Folder, Map } from 'lucide-react';

const iconMap = {
  users: Users,
  coffee: Coffee,
  collection: Folder,
  map: Map
};

// Define getIcon function at the top
const getIcon = (iconName) => {
  const icons = {
    "gamepad": "gamepad",
    "dice": "dice",
    "music": "music",
    "food": "food",
  };

  return icons[iconName] || "?"; // Default icon if not found
};
const GameNight = () => {
  const safeGameNightData = gameNightData || {};
  const safePopularGames = safeGameNightData.popularGames || {};
  const safeGames = safePopularGames.games || []; // Ensure it's always an array

  console.log("Safe Games Data:", safeGames); // Debugging line

  return (
    <div className="gamenight-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${safeGameNightData.heroSection?.backgroundImage || ''})` }}>
        <div className="overlay">
          <div className="hero-content">
            <h1 className="game-title">{safeGameNightData.heroSection?.title || "Game Night"}</h1>
            <p className="game-text">{safeGameNightData.heroSection?.description || "Enjoy the best game nights with us!"}</p>
            <button className="cta-button">Book Your Night</button>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="games-section">
        <div className="section-titles">
          <h2 className="small-title">{safePopularGames.sectionTitle?.small || "Popular"}</h2>
          <h1 className="big-title">{safePopularGames.sectionTitle?.big || "Games"}</h1>
        </div>
        <div className="games-grid">
          {safeGames.length > 0 ? (
            safeGames.map((game, index) => (
              <div className="game-card" key={index}>
                <div className="game-image">
                  <img src={game.image || ""} alt={game.alt || "Game Image"} />
                </div>
                <div className="game-info">
                  <h3 className="game-name">{game.name || "Game Name"}</h3>
                  <p className="game-desc">{game.description || "No description available."}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No games available.</p> // Prevents the map error
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-titles">
          <h2 className="small-title">{gameNightData.gameCategories.sectionTitle.small}</h2>
          <h1 className="big-title">{gameNightData.gameCategories.sectionTitle.big}</h1>
        </div>
        <div className="categories-grid">
          {gameNightData.gameCategories.categories.map((category, index) => (
            <div className="category-card" key={index}>
              <img src={category.image} alt={category.alt} />
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-desc">{category.description}</p>
                <div className="featured-games">
                  <h4>Featured Games:</h4>
                  <ul>
                    {category.featured.map((game, idx) => (
                      <li key={idx}>{game}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-titles">
          <h1 className="services-title">{gameNightData.services.title}</h1>
          <p className="services-subtitle">{gameNightData.services.subtitle}</p>
        </div>
        <div className="services-grid">
          {gameNightData.services.items.map((service, index) => (
            <div className="service-card" key={index}>
              <p className="service-icon">{service.icon}</p>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-grid">
          {gameNightData.testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.comment}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
                <div className="rating">
                  {'*'.repeat(testimonial.rating)}
                  {'*'.repeat(5 - testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2 className="pricing-title">{gameNightData.pricing.title}</h2>
        <div className="pricing-grid">
          {gameNightData.pricing.options.map((option, index) => (
            <div className="pricing-card" key={index}>
              <h3 className="package-name">{option.name}</h3>
              <div className="package-price">{option.price}</div>
              <p className="package-duration">{option.duration}</p>
              <ul className="package-features">
                {option.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="book-button">Select Package</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GameNight;