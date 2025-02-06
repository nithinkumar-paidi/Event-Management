import React from "react";
import { Calendar, Users, Award, Heart } from "lucide-react";
import './About.css';

const About = () => {
  return (
    <section id='about'>
      <div className="about-container">
        <h2 className="title">About Us</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Creating Unforgettable Moments</h3>
            <p>
              At King's Events, we transform ordinary occasions into extraordinary 
              experiences. With over a decade of expertise in event planning and 
              management, we've mastered the art of creating memorable celebrations.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <Calendar size={24} />
              <h4>500+</h4>
              <p>Events Organized</p>
            </div>
            <div className="stat-card">
              <Users size={24} />
              <h4>10k+</h4>
              <p>Happy Clients</p>
            </div>
            <div className="stat-card">
              <Award size={24} />
              <h4>15+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <Heart size={24} />
              <h4>98%</h4>
              <p>Satisfaction Rate</p>
            </div>
          </div>

          <div className="services-highlight">
            <h3>Our Expertise</h3>
            <div className="services-grid">
              <div className="service">
                <h4>Weddings</h4>
                <p>Creating magical moments for your special day</p>
              </div>
              <div className="service">
                <h4>Corporate Events</h4>
                <p>Professional planning for business excellence</p>
              </div>
              <div className="service">
                <h4 >Social Gatherings</h4>
                <p>Making every celebration unique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;