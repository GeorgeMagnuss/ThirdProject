import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="navbar-brand">
          📊 Vacation Stats
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/statistics">Statistics</Link></li>
              <li><Link to="/about">About</Link></li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger"
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;