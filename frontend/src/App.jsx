import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import Services from "./components/Servicess/Services";
import AnniversaryPlanning from "./components/AnniversaryPlanning/AnniversaryPlanning";
import BirthdayPage from "./components/BirthdayPage/BirthdayPage";
import CampingPage from "./components/CampingPage/CampingPage";
import GameNightPage from "./components/GameNightPage/GameNightPage";
import PartyPage from "./components/PartyPage/PartyPage";
import WeddingPage from "./components/WeddingPage/WeddingPage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import PlaceOverview from "./pages/PlaceOverview";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import ForgotPassword from "./components/Admin/ForgotPassword";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute";
import AuthModal from './components/Auth/AuthModal';
import ResetPassword from "./components/Admin/ResetPassword";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";

const MainPage = () => (
  <>
    <HeroSection />
    <Services />
    <About />
    <Contact />
  </>
);

const LoginPage = ({ onLogin, switchToSignup }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = async (userData) => {
    // Store login data
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('isAdmin', userData.isAdmin || false);

    // Determine where to redirect
    const from = location.state?.from || '/birthday'; // Default to birthday if no previous page
    navigate(from, { replace: true });
  };

  return (
    <LoginForm
      onLogin={handleLoginSuccess}
      switchToSignup={switchToSignup}
    />
  );
};

const SignupPage = ({ onLogin, switchToLogin }) => {
  const navigate = useNavigate();

  const handleSignupSuccess = async (userData) => {
    // Store signup data
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('isAdmin', userData.isAdmin || false);

    // Redirect to birthday page after signup
    navigate('/birthday', { replace: true });
  };

  return (
    <SignupForm
      onLogin={handleSignupSuccess}
      switchToLogin={switchToLogin}
    />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAdminLogin = (adminData) => {
    localStorage.setItem('adminToken', adminData.token);
    localStorage.setItem('isAdmin', 'true');
    setIsAuthenticated(true);
    window.location.href = '/admin/dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          openAuthModal={openAuthModal}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/hero" element={<MainPage />} />
            <Route path="/services" element={<Services />} />

            {/* Login and Signup Routes */}
            <Route
              path="/login"
              element={
                <LoginPage
                  onLogin={(data) => {
                    setIsAuthenticated(true);
                    setShowAuthModal(false);
                  }}
                  switchToSignup={switchToSignup}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignupPage
                  onLogin={(data) => {
                    setIsAuthenticated(true);
                    setShowAuthModal(false);
                  }}
                  switchToLogin={switchToLogin}
                />
              }
            />

            {/* Protected service routes */}
            <Route path="/birthday" element={
              <ProtectedRoute>
                <BirthdayPage />
              </ProtectedRoute>
            } />
            <Route path="/anniversary" element={
              <ProtectedRoute>
                <AnniversaryPlanning />
              </ProtectedRoute>
            } />
            <Route path="/camping" element={
              <ProtectedRoute>
                <CampingPage />
              </ProtectedRoute>
            } />
            <Route path="/gamenight" element={
              <ProtectedRoute>
                <GameNightPage />
              </ProtectedRoute>
            } />
            <Route path="/party" element={
              <ProtectedRoute>
                <PartyPage />
              </ProtectedRoute>
            } />
            <Route path="/wedding" element={
              <ProtectedRoute>
                <WeddingPage />
              </ProtectedRoute>
            } />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/place-overview/:placeId" element={<PlaceOverview />} />

            {/* Admin routes */}
            <Route
              path="/admin/login"
              element={
                !localStorage.getItem('adminToken') ? (
                  <AdminLogin onAdminLogin={handleAdminLogin} />
                ) : (
                  <Navigate to="/admin/dashboard" replace />
                )
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>
        <Footer />
        <Toaster />

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          setMode={(newMode) => {
            console.log('Setting mode to:', newMode); // Debug log
            setAuthMode(newMode);
          }}
          onLogin={(userData) => {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
        />
      </div>
    </Router>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : null;
};

export default App;