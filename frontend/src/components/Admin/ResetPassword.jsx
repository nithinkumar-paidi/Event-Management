import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminAxios from '../../utils/adminAxios';
import './ResetPassword.css';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token validity when component mounts
    const verifyToken = async () => {
      try {
        const response = await adminAxios.post('/forgot-password', { email });
        setTokenValid(true);
      } catch (err) {
        setError('Invalid or expired reset token');
        setTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await adminAxios.post(`/reset-password/${token}`, {
        password: passwords.password
      });
      setMessage('Password successfully reset');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Password</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="password"
            value={passwords.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter new password"
            required
            minLength="8"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="form-input"
            placeholder="Confirm new password"
            required
            minLength="8"
          />
        </div>

        <button 
          type="submit" 
          className="reset-password-button"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
