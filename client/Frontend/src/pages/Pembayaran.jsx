import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Pembayaran = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`http://localhost:5000/api/transaksi/${id}`, config);
        setTransaksi(data);
      } catch (error) {
        console.error('Gagal mengambil data transaksi:', error);
        toast.error('Gagal mengambil data transaksi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, [id]);

  const handleKonfirmasiBayar = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/transaksi/${id}/konfirmasi-bayar`, {}, config); // PUT kosong
      toast.success('Pembayaran berhasil dikonfirmasi.');
      navigate(`/transaksi/${id}`);
    } catch (error) {
      console.error('Gagal mengonfirmasi pembayaran:', error);
      toast.error('Gagal mengonfirmasi pembayaran.');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!transaksi) return <div className="p-6 text-center">Transaksi tidak ditemukan.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/history')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Kembali
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Instruksi Pembayaran</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <p className="text-gray-700">ID Transaksi:</p>
          <p className="font-medium">{transaksi._id}</p>
        </div>

        <div>
          <p className="text-gray-700">Total Pembayaran:</p>
          <p className="text-2xl font-bold text-green-600">Rp {transaksi.totalHarga.toLocaleString('id-ID')}</p>
        </div>

        <div>
          <p className="text-gray-700">Transfer ke rekening:</p>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="font-semibold">BCA - 1234567890</p>
            <p>a.n. PT Apotek Sehat</p>
          </div>
        </div>

        {/* Tombol hanya muncul jika statusPembayaran belum "Sudah Dibayar" */}
        {transaksi.statusPembayaran !== 'Sudah Dibayar' && (
          <div className="text-center">
            <button
              onClick={handleKonfirmasiBayar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Saya Sudah Bayar
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        Setelah pembayaran dikonfirmasi, admin akan memproses pesanan Anda.
      </p>
    </div>
  );
};

export default Pembayaran;
