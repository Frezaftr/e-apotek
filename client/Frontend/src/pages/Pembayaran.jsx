import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Pembayaran = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snapToken, setSnapToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`http://localhost:5000/api/transaksi/${id}`, config);
        setTransaksi(data);

        // Setelah transaksi didapat, request Snap Token
        const snapRes = await axios.post(`http://localhost:5000/api/payment/create-payment`, {
          orderId: data._id,
          grossAmount: data.totalHarga,
        });
        setSnapToken(snapRes.data.token);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        toast.error('Gagal mengambil data pembayaran.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, [id]);

  useEffect(() => {
    // Load script Snap Midtrans setelah dapat token
    if (snapToken) {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', 'SB-Mid-client-S3hx2fBNYOLc55Jo'); // Client Key Sandbox
      document.body.appendChild(script);

      script.onload = () => {
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            console.log('Pembayaran berhasil:', result);
            toast.success('Pembayaran berhasil!');
            navigate('/history');
          },
          onPending: function (result) {
            console.log('Menunggu pembayaran:', result);
            toast('Menunggu pembayaran selesai...');
          },
          onError: function (result) {
            console.error('Pembayaran gagal:', result);
            toast.error('Pembayaran gagal.');
          },
          onClose: function () {
            toast('Kamu menutup pop-up pembayaran.');
          }
        });
      };
    }
  }, [snapToken, navigate]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!transaksi) return <div className="p-6 text-center">Transaksi tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header & Tombol Back */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mr-4">← Kembali</button>
        <h1 className="text-3xl font-bold">Pembayaran</h1>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kiri - Informasi Transfer */}
        <div className="space-y-8">
          {/* ID Transaksi */}
          <div>
            <h2 className="text-xl font-semibold mb-2">ID Transaksi</h2>
            <p className="text-gray-700">{id}</p>
          </div>

          {/* Total Pembayaran */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Total yang harus dibayar</h2>
            <div className="bg-gray-100 p-4 rounded-lg text-center text-lg font-bold">
              Rp {(transaksi.totalHarga || 0).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Kanan - QR Code (Dummy, karena Snap nanti handle sendiri) */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Menunggu Pembayaran...</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/200x200.png?text=Menunggu+Pembayaran"
              alt="QR Code Pembayaran"
              className="rounded-md w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-500 text-sm mt-4">Transaksi anda sedang diproses melalui Midtrans</p>
        </div>
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        Setelah pembayaran selesai, status pesanan akan diperbarui secara otomatis.
      </p>
    </div>
  );
};

export default Pembayaran;
