import React, { useState } from 'react';
import './AuthModal.css';
import { useNavigate } from "react-router-dom";


const LoginForm = ({ onLogin }) => {

  const navigate = useNavigate();

  const switchToSignup = () => {
    navigate("/signup");
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/admin/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="auth-form-login">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-switch">
        Don't have an account? 
        <span onClick={switchToSignup}>Sign up</span>
      </p>
    </div>
  );
};

export default LoginForm;