import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE
});

export const authApi = (token) =>
  axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${token}` }
  });
