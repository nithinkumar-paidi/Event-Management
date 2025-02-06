import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Edit, Trash, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import adminAxios from '../../utils/adminAxios';
import './adminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalServices: 0,
    totalPlaces: 0
  });
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // New state for service management
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: '',
    galleryImages: []
  });
  const [editingService, setEditingService] = useState(null);
  const [tempGalleryImage, setTempGalleryImage] = useState({ url: '', description: '' });

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, servicesData, bookingsData] = await Promise.all([
        adminAxios.get('/stats'),
        adminAxios.get('/services'),
        adminAxios.get('/bookings'),
      ]);

      setStats(statsData.data);
      setServices(servicesData.data || []);
      setBookings(bookingsData.data.bookings || []);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Failed to fetch dashboard data');
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Service management functions
  const handleAddGalleryImage = () => {
    if (tempGalleryImage.url && tempGalleryImage.description) {
      setNewService(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, { ...tempGalleryImage }]
      }));
      setTempGalleryImage({ url: '', description: '' });
    }
  };

  const handleRemoveGalleryImage = (index) => {
    setNewService(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingService) {
        const response = await adminAxios.put(`/services/${editingService._id}`, newService);
        setServices(services.map(service =>
          service._id === editingService._id ? response.data : service
        ));
        setEditingService(null);
      } else {
        const response = await adminAxios.post('/services', newService);
        setServices([...services, response.data]);
      }
      setNewService({
        title: '',
        description: '',
        image: '',
        galleryImages: []
      });
      setError(null);
    } catch (error) {
      setError(`Failed to ${editingService ? 'update' : 'add'} service: ` + 
        (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setLoading(true);
        await adminAxios.delete(`/services/${serviceId}`);
        setServices(services.filter(service => service._id !== serviceId));
        setError(null);
      } catch (error) {
        setError('Failed to delete service: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const startEditing = (service) => {
    setEditingService(service);
    setNewService({
      title: service.title,
      description: service.description,
      image: service.image,
      galleryImages: [...service.galleryImages]
    });
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      setLoading(true);
      await adminAxios.patch(`/bookings/${bookingId}/${action}`);
      fetchDashboardData(); // Refresh all data
      setError(null);
    } catch (error) {
      setError(`Failed to ${action} booking: ` + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.placeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }} className="logout-button">
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-spinner">Loading...</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Total Services</h3>
          <p>{stats.totalServices}</p>
        </div>
        <div className="stat-card">
          <h3>Total Places</h3>
          <p>{stats.totalPlaces}</p>
        </div>
      </div>

   <div className="admin-sections">
        <div className="section-buttons">
          <button
            className={activeSection === 'services' ? 'active' : ''}
            onClick={() => setActiveSection('services')}
          >
            Manage Services
          </button>
          <button
            className={activeSection === 'bookings' ? 'active' : ''}
            onClick={() => setActiveSection('bookings')}
          >
            View Bookings
          </button>
        </div>

        {activeSection === 'services' && (
          <div className="services-section">
            <form onSubmit={handleServiceSubmit} className="service-form">
              <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Service Title"
                  value={newService.title}
                  onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Description"
                  value={newService.description}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Main Image URL"
                  value={newService.image}
                  onChange={(e) => setNewService(prev => ({ ...prev, image: e.target.value }))}
                  required
                />
              </div>

              <div className="gallery-section">
                <h3>Gallery Images</h3>
                <div className="gallery-input">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={tempGalleryImage.url}
                    onChange={(e) => setTempGalleryImage(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={tempGalleryImage.description}
                    onChange={(e) => setTempGalleryImage(prev => ({ 
                      ...prev, 
                      description: e.target.value 
                    }))}
                  />
                  <button type="button" onClick={handleAddGalleryImage}>
                    <Plus />
                  </button>
                </div>

                <div className="gallery-preview">
                  {newService.galleryImages.map((img, index) => (
                    <div key={index} className="gallery-item">
                      <img src={img.url} alt={img.description} />
                      <span>{img.description}</span>
                      <button type="button" onClick={() => handleRemoveGalleryImage(index)}>
                        <X />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
                {editingService && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService(null);
                      setNewService({
                        title: '',
                        description: '',
                        image: '',
                        galleryImages: []
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="services-grid">
              {services.map(service => (
                <div key={service._id} className="service-card">
                  <img src={service.image} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="gallery-count">
                    Gallery Images: {service.galleryImages.length}
                  </div>
                  <div className="card-actions">
                    <button onClick={() => startEditing(service)}>
                      <Edit />
                    </button>
                    <button onClick={() => handleDeleteService(service._id)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === 'bookings' && (
          <div className="bookings-section">
            <div className="bookings-filters">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <h2>Recent Bookings</h2>
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Guest Name</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.placeName}</td>
                        <td>{booking.customerName}</td>
                        <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                        <td>
                          {booking.status === 'pending' ? (
                            <div className="status-actions">
                              <button
                                onClick={() => handleBookingAction(booking._id, 'accept')}
                                className="accept-button"
                                disabled={loading}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleBookingAction(booking._id, 'reject')}
                                className="reject-button"
                                disabled={loading}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`${booking.status}-status`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No bookings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;




