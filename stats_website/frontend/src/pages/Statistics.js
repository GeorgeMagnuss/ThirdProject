import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { statsService } from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Statistics = () => {
  const [vacationStats, setVacationStats] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null);
  const [likesDistribution, setLikesDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        
        const [vacStats, users, likes, distribution] = await Promise.all([
          statsService.getVacationStats(),
          statsService.getTotalUsers(),
          statsService.getTotalLikes(),
          statsService.getLikesDistribution()
        ]);

        setVacationStats(vacStats);
        setTotalUsers(users);
        setTotalLikes(likes);
        setLikesDistribution(distribution);
        
      } catch (err) {
        setError('Failed to load statistics: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Statistics...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  const vacationChartData = vacationStats ? [
    { name: 'Past Vacations', value: vacationStats.pastVacations },
    { name: 'Ongoing Vacations', value: vacationStats.ongoingVacations },
    { name: 'Future Vacations', value: vacationStats.futureVacations }
  ] : [];

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        📊 System Statistics Dashboard
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalUsers?.totalUsers || 0}</div>
          <div className="stat-label">Total Users</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{totalLikes?.totalLikes || 0}</div>
          <div className="stat-label">Total Likes</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {vacationStats ? 
              vacationStats.pastVacations + vacationStats.ongoingVacations + vacationStats.futureVacations 
              : 0
            }
          </div>
          <div className="stat-label">Total Vacations</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Vacation Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={vacationChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {vacationChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Likes Distribution by Destination</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={likesDistribution}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="destination" 
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {vacationStats && (
        <div className="card">
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Vacation Timeline Breakdown</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: '#ecf0f1', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                {vacationStats.pastVacations}
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Past Vacations</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#ecf0f1', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
                {vacationStats.ongoingVacations}
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Ongoing Vacations</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#ecf0f1', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
                {vacationStats.futureVacations}
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Future Vacations</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;