import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ color: '#2c3e50', marginBottom: '30px', textAlign: 'center' }}>
          👨‍💻 About the Development Team
        </h1>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            👨‍💻
          </div>
          <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>George Mattar</h2>
          <p style={{ color: '#7f8c8d', fontSize: '18px' }}>John Bryce Student</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: '#3498db', marginBottom: '20px' }}>🚀 Project Overview</h3>
          <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>
            This vacation statistics dashboard is part of a comprehensive vacation management system. 
            It provides real-time analytics and insights for administrators to monitor system usage, 
            vacation trends, and user engagement patterns.
          </p>

          <h3 style={{ color: '#3498db', marginBottom: '20px' }}>🛠️ Technologies Used</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Backend</h4>
              <ul style={{ color: '#555', lineHeight: '1.6' }}>
                <li>Django Framework</li>
                <li>Django REST Framework</li>
                <li>PostgreSQL Database</li>
                <li>Docker Containerization</li>
              </ul>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Frontend</h4>
              <ul style={{ color: '#555', lineHeight: '1.6' }}>
                <li>React.js</li>
                <li>React Router</li>
                <li>Recharts for Visualization</li>
                <li>Responsive CSS Design</li>
              </ul>
            </div>
          </div>

          <h3 style={{ color: '#3498db', marginBottom: '20px', marginTop: '30px' }}>📋 Key Features</h3>
          <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '8px' }}>
            <ul style={{ color: '#555', lineHeight: '1.8', fontSize: '16px' }}>
              <li><strong>Real-time Statistics:</strong> Live data on vacation bookings and user activity</li>
              <li><strong>Visual Analytics:</strong> Interactive charts and graphs for data visualization</li>
              <li><strong>Admin Authentication:</strong> Secure login system for authorized personnel</li>
              <li><strong>Responsive Design:</strong> Optimized for desktop and mobile viewing</li>
              <li><strong>Containerized Deployment:</strong> Docker-based deployment for easy scaling</li>
              <li><strong>Cloud Ready:</strong> Configured for AWS Cloud deployment</li>
            </ul>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>📧 Contact Information</h3>
            <p style={{ fontSize: '18px', marginBottom: '5px' }}>
              Developer Email: developer@example.com
            </p>
            <p style={{ fontSize: '16px', opacity: '0.9' }}>
              Project developed as part of Python Full Stack Web Developer Course
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;