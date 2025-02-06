import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import adminAxios from "../../utils/adminAxios";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", {
        email: formData.email,
        passwordLength: formData.password.length
      });

      const response = await adminAxios.post("/login", formData);
      console.log("Login response received:", response.status);

      if (response.data && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data));

        onLogin && onLogin(response.data);

        // Check for redirect query parameter
        const redirectPath = new URLSearchParams(location.search).get("redirect");
        navigate(redirectPath || "/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error details:", {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err.message
      });

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Invalid email or password. Please check your credentials.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Unable to connect to server. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your password"
            required
          />
          <div className="forgot-password-link">
            <Link to="/admin/forgot-password">Forgot Password?</Link>
          </div>
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
