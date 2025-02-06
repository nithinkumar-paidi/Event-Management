import { useState } from 'react';
import adminAxios from '../../utils/adminAxios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const response = await adminAxios.post('/v1/auth/forgot-password', { email }); // Remove 'api/admin' part
      setMessage(response.data.message || 'Password reset link sent to your email.');
      setResetSent(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send password reset link.');
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!resetSent ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <button 
            type="submit" 
            className="forgot-password-button" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        <div className="reset-instructions">
          <p>Please check your email for the password reset link.</p>
          <p>The link will expire in 10 minutes.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;