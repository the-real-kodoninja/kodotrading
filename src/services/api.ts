import axios from 'axios';

// Base URL for your custom backend (to be updated later)
const API_BASE_URL = 'http://localhost:8000/api'; // Placeholder for your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is authenticated
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming token-based auth
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = async (email: string, password: string) => {
  // Mock response for now
  return { token: 'mock-token', username: email.split('@')[0] };
  // Uncomment when backend is ready
  // const response = await api.post('/auth/login', { email, password });
  // return response.data;
};

export const signup = async (email: string, username: string, password: string) => {
  // Mock response for now
  return { token: 'mock-token', username };
  // Uncomment when backend is ready
  // const response = await api.post('/auth/signup', { email, username, password });
  // return response.data;
};

// Feed API
export const getPosts = async () => {
  // Mock response for now
  return [
    {
      id: '1',
      username: 'mockuser',
      content: 'This is a mock post!',
      timestamp: new Date(),
      likes: 10,
      comments: 2,
    },
  ];
  // Uncomment when backend is ready
  // const response = await api.get('/posts');
  // return response.data;
};

export const createPost = async (content: string, username: string) => {
  // Mock response for now
  return {
    id: Date.now().toString(),
    username,
    content,
    timestamp: new Date(),
    likes: 0,
    comments: 0,
  };
  // Uncomment when backend is ready
  // const response = await api.post('/posts', { content, username });
  // return response.data;
};

// Portfolio API
export const getPortfolio = async (userId: string) => {
  // Mock response for now
  return [
    {
      id: '1',
      ticker: 'AAPL',
      shares: 10,
      purchasePrice: 140,
      currentPrice: 150,
    },
  ];
  // Uncomment when backend is ready
  // const response = await api.get(`/portfolio/${userId}`);
  // return response.data;
};

export const addHolding = async (userId: string, ticker: string, shares: number, purchasePrice: number) => {
  // Mock response for now
  return {
    id: Date.now().toString(),
    ticker,
    shares,
    purchasePrice,
    currentPrice: 150,
  };
  // Uncomment when backend is ready
  // const response = await api.post(`/portfolio/${userId}`, { ticker, shares, purchasePrice });
  // return response.data;
};
