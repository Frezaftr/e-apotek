// client/frontend/src/admin/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      alert("Login admin berhasil!");
      navigate("/admin/dashboard"); // Ganti sesuai rute dashboard admin kamu
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-blue-900 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
