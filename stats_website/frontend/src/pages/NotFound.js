import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '6rem', color: '#e74c3c', marginBottom: '20px' }}>404</h1>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Page Not Found</h2>
        <p style={{ color: '#7f8c8d', fontSize: '18px', marginBottom: '30px' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;