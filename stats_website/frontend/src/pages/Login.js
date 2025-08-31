import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        onLogin(result.user);
        navigate('/statistics');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials or insufficient permissions. Only admin users can access this system.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
          🔐 Admin Login
        </h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your admin email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <small style={{ color: '#6c757d' }}>
            <strong>Demo Credentials:</strong><br />
            Email: admin@example.com<br />
            Password: adminpass
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;