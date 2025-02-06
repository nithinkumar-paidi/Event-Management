

// src/pages/CampingPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import campingData from "../../data/campingdata"; // Adjust the path to your JSON file
import "./CampingPage.css";

const CampingPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [
    "/assets/banner.mp4", // Video 1
    "/assets/banners.mp4", // Video 2
    "/assets/banner1.mp4", // Video 3
    "/assets/banner4.mp4", // Video 4
  ];

  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);

    // Automatically switch videos
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const handleBookClick = (place) => {
    navigate(`/place-overview/${place.id}`, { 
      state: { place: {
        ...place,
        images: [
          { url: place.image_url, alt: place.name },
          { url: place.image_url, alt: place.name },
          { url: place.image_url, alt: place.name }
        ]
      }}
    });
  };
  return (
    <div className="camping-page">
      <div className="scrolling-banner">
        <div className="video-container">
          {videos.map((video, index) => (
            <video
              key={`banner-video-${index}`}
              src={video}
              className={`banner-video ${index === currentVideoIndex ? "visible" : "hidden"}`}
              muted
              autoPlay
              loop
              playsInline
            />
          ))}
        </div>
        <div className="fixed-message">
          <h2>Explore The Beauty of Camping</h2>
          <p>Discover the best places to camp and enjoy nature in its purest form. Book your adventure now!</p>
        </div>
      </div>

      {/* Sections */}
      {Object.keys(campingData).map((section) => (
        <section key={section} className="camping-section">
          <h2>{section} Visit Places:</h2>
          <div className="camping-list">
            {campingData[section]?.map((place) => (
              <div key={place.id} className="camping-item">
                <div className="card">
                  <img src={place.image_url} alt={place.name} />
                  <div className="book-now-container">
                    <button className="book-btn" onClick={() => handleBookClick(place)}>
                      Book Now
                    </button>
                  </div>
                </div>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <p>Location: {place.location}</p>
                <p>Price: {place.price}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer Section */}
      <div className="footer">
        <h2>Thank you for choosing us!</h2>
        <p>Your adventure awaits. Let us help you create lasting memories in nature.</p>
      </div>
    </div>
  );
};

export default CampingPage;
