import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const TransaksiAdmin = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransaksi = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transaksi");
      setTransaksi(res.data);
    } catch (error) {
      console.error("Gagal memuat data transaksi:", error);
      toast.error("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/transaksi/${id}/status`, {
        status: newStatus,
      });
      toast.success("Status transaksi berhasil diupdate");
      fetchTransaksi(); // refresh data
    } catch (error) {
      console.error("Gagal mengubah status:", error);
      toast.error("Gagal mengubah status transaksi");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      {transaksi.map((trx) => (
        <div
          key={trx._id}
          className="bg-white shadow rounded-lg p-4 space-y-2 border"
        >
          <p><strong>User ID:</strong> {trx.user}</p>
          <p><strong>Total:</strong> Rp {trx.totalHarga.toLocaleString("id-ID")}</p>
          <p><strong>Status Pembayaran:</strong> {trx.statusPembayaran}</p>
          <p><strong>Status Transaksi:</strong> {trx.status}</p>
          <div className="space-x-2 mt-2">
            {["pending", "delivery", "success", "cancel"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(trx._id, status)}
                className={`px-3 py-1 rounded text-white text-sm ${
                  trx.status === status
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={trx.status === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransaksiAdmin;
