import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, mode, setMode, onLogin }) => {
  if (!isOpen) return null;

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="forms-container">
          <div className={`form-wrapper ${mode === 'login' ? 'active' : ''}`}>
            <LoginForm 
              onLogin={onLogin}
              switchToSignup={() => handleModeSwitch('signup')}
            />
          </div>
          <div className={`form-wrapper ${mode === 'signup' ? 'active' : ''}`}>
            <SignupForm 
              onLogin={onLogin}
              switchToLogin={() => handleModeSwitch('login')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;