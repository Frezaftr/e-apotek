// src/api/userApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
