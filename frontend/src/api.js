import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

export const submitMember = (type, data) =>
  API.post(`/members/${type}`, data);

export const submitContact = (data) =>
  API.post('/contact', data);

export default API;
