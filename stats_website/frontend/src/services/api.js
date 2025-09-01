import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login/', { email, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/logout/');
    return response.data;
  },
};

export const statsService = {
  getVacationStats: async () => {
    const response = await api.get('/stats/vacations/');
    return response.data;
  },
  
  getTotalUsers: async () => {
    const response = await api.get('/users/total/');
    return response.data;
  },
  
  getTotalLikes: async () => {
    const response = await api.get('/likes/total/');
    return response.data;
  },
  
  getLikesDistribution: async () => {
    const response = await api.get('/likes/distribution/');
    return response.data;
  },
};

export default api;