// src/api/adminApi.js
import axios from "axios";

export const loginAdmin = async (formData) => {
  const res = await axios.post("http://localhost:5000/api/admin/login", formData);
  return res.data;
};
