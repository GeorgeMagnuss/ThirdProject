import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">📊 Vacation Statistics Dashboard</h1>
        <p className="hero-subtitle">
          Comprehensive analytics for your vacation management system
        </p>
        <div style={{ marginTop: '30px' }}>
          {isAuthenticated ? (
            <Link to="/statistics" className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 30px' }}>
              View Statistics
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 30px' }}>
              Admin Login
            </Link>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>📈 Vacation Analytics</h3>
          <p>Track and analyze vacation trends including past, ongoing, and future vacation statistics.</p>
        </div>

        <div className="card">
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>👥 User Insights</h3>
          <p>Monitor user engagement and total registered users in the vacation management system.</p>
        </div>

        <div className="card">
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>❤️ Popularity Metrics</h3>
          <p>Analyze vacation destination popularity through like counts and user preferences.</p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>System Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#3498db' }}>Real-time Statistics</h4>
            <p>Get up-to-date information about vacation bookings, user activity, and engagement metrics.</p>
          </div>
          <div>
            <h4 style={{ color: '#3498db' }}>Admin Dashboard</h4>
            <p>Secure admin interface for authorized personnel to view comprehensive system analytics.</p>
          </div>
          <div>
            <h4 style={{ color: '#3498db' }}>Visual Analytics</h4>
            <p>Interactive charts and graphs for better understanding of vacation trends and user behavior.</p>
          </div>
          <div>
            <h4 style={{ color: '#3498db' }}>Distribution Analysis</h4>
            <p>Detailed breakdown of vacation destination popularity and like distribution patterns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;