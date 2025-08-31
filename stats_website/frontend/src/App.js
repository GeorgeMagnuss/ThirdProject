import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Statistics from './pages/Statistics';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
        
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/statistics" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/statistics" 
            element={
              isAuthenticated ? 
              <Statistics /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/users/total" element={<Navigate to="/statistics" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;