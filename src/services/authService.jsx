// src/services/authService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
