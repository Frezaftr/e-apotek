import { useEffect, useState } from "react";
import ProdukCRUD from "../components/ProdukCRUD";
import TransaksiAdmin from "../components/TransaksiAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [counts, setCounts] = useState({ produk: 0, transaksi: 0, user: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const resProduk = await axios.get("http://localhost:5000/api/produk", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resTransaksi = await axios.get("http://localhost:5000/api/transaksi", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resUser = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCounts({
          produk: resProduk.data.length,
          transaksi: resTransaksi.data.length,
          user: resUser.data.length,
        });
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // hapus token
    navigate("/admin/login"); // redirect ke login admin
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-2xl font-bold text-center py-4 border-b border-gray-700">
          e-Apotek Admin
        </div>
        <nav className="flex-1 px-4 py-2">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection("dashboard")}
                className="w-full text-left px-2 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection("produk")}
                className="w-full text-left px-2 py-2 rounded hover:bg-gray-700"
              >
                Produk
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection("transaksi")}
                className="w-full text-left px-2 py-2 rounded hover:bg-gray-700"
              >
                Transaksi
              </button>
            </li>
          </ul>
        </nav>
        {/* Tombol Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DashboardCard title="Produk" count={counts.produk} color="blue" />
              <DashboardCard title="Transaksi" count={counts.transaksi} color="orange" />
              <DashboardCard title="User" count={counts.user} color="green" />
            </div>
          </div>
        )}

        {activeSection === "produk" && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Kelola Produk</h1>
            <ProdukCRUD />
          </div>
        )}

        {activeSection === "transaksi" && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Riwayat Transaksi</h1>
            <TransaksiAdmin />
          </div>
        )}
      </main>
    </div>
  );
};

const DashboardCard = ({ title, count, color }) => {
  const colorMap = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
  };

  return (
    <div className={`rounded-lg shadow p-4 text-white ${colorMap[color]}`}>
      <h2 className="text-lg">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

export default AdminDashboard;
