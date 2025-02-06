// import React from "react";
// import { Link } from "react-scroll";

// const HeroSection = () => {
//   return (
//     <section className="hero">
//       <img src="/restaurant.jpg" alt="restaurant" />
//       <div className="item">
//         <h3>Dream Maker</h3>
//         <div>
//           <h1>Your Personal Dream Maker</h1>
//           <p>
//             We believe that it is all about the BIG DREAMS and the samll
//             details!
//           </p>
//           <Link to="contact" spy={true} smooth={true} duration={500}>
//             BOOK NOW
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;




import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./HeroSection.css";


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    "./assets/marriage.mp4",
    "./assets/camping.mp4",
    "./assets/banner4.mp4",
    "./assets/trikking.mp4",
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
 
 
    <section className="hero" id='hero'>
 
      <div className="video-container">
        <video
          key={videos[currentIndex]}
          className="video-bg"
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
          }}
        >
          <source src={videos[currentIndex]} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="content">
        <h3>Dream Maker</h3>
        <div className="main-content">
          <h1>Your Personal Dream Maker</h1>
          <p>
            We believe that it is all about the BIG DREAMS and the small details!
          </p>
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            duration={500}
            className="book-btn"
          >
            BOOK NOW
          </Link>
        </div>
      </div>

      <div className="video-dots">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`dot ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
    


  );
};

export default HeroSection;