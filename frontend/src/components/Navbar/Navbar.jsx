import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const offsets = {
    hero: -50,
    services: -50,
    about: -50,
    contact: -120
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offsetTop = element.offsetTop + (offsets[hash] || 0);
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleNavClick = (sectionId) => {
    setShow(false);
    
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop + (offsets[sectionId] || 0);
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <nav style={{
        transition: 'background 0.3s ease'
      }}>
        <img src="./assets/logo.png" alt="LOGO" className='logo1' />
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <a
              onClick={() => handleNavClick('hero')}
              className="nav-link"
            >
              HOME
            </a>
            <a
              onClick={() => handleNavClick('services')}
              className="nav-link"
            >
              SERVICES
            </a>
            <a
              onClick={() => handleNavClick('about')}
              className="nav-link"
            >
              ABOUT
            </a>
            <a
              onClick={() => handleNavClick('contact')}
              className="nav-link"
            >
              CONTACT
            </a>
            <a
              onClick={handleAuthClick}
              className="nav-link"
            >
              {isAuthenticated ? 'LOGOUT' : 'LOGIN'}
            </a>
          </div>
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </div>
  );
};
export default Navbar;