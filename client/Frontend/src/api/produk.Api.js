import axios from 'axios';

const API_URL = 'http://localhost:5000/api/produk';

export const createProduk = async (data) => {
  const adminToken = localStorage.getItem("adminToken");
  const res = await axios.post(API_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${adminToken}`,
    },
  });
  return res.data;
};

export const getProduk = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteProduk = async (id) => {
  const adminToken = localStorage.getItem("adminToken");
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
  return res.data;
};

export const updateProduk = async (id, data) => {
  const adminToken = localStorage.getItem("adminToken");
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${adminToken}`,
    },
  });
  return res.data;
};
