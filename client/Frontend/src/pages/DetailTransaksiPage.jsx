import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailTransaksiPage = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:5000/api/transaksi/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransaksi(response.data);
      } catch (error) {
        console.error('Gagal mengambil detail transaksi:', error);
      }
    };

    fetchDetail();
  }, [id]);

  const handleCancel = async () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan transaksi ini?')) {
      try {
        const token = localStorage.getItem('userToken');
        await axios.put(`http://localhost:5000/api/transaksi/${id}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Transaksi berhasil dibatalkan.');
        navigate('/history'); // balik ke history setelah cancel
      } catch (error) {
        console.error('Gagal membatalkan transaksi:', error);
        alert('Gagal membatalkan transaksi.');
      }
    }
  };

  if (!transaksi) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/history')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Kembali
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">Detail Transaksi</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">

        {/* Status + Tanggal */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-6">
          <div>
            <p className="text-gray-600">Tanggal Transaksi:</p>
            <p className="font-semibold">{new Date(transaksi.createdAt).toLocaleString()}</p>
          </div>
          <div className="mt-4 md:mt-0">
              <p className="text-gray-600">Status Pembayaran:</p>
              <p className={`font-bold ${transaksi.statusPembayaran === 'Sudah Dibayar' ? 'text-green-600' : 'text-red-600'}`}>
                {transaksi.statusPembayaran}
              </p>

              <p className="text-gray-600 mt-2">Status Transaksi:</p>
              <p className={`font-bold ${
                transaksi.statusTransaksi === 'cancel' ? 'text-red-600' :
                transaksi.statusTransaksi === 'pending' ? 'text-yellow-600' :
                transaksi.statusTransaksi === 'delivery' ? 'text-blue-600' :
                transaksi.statusTransaksi === 'success' ? 'text-green-600' : ''
              }`}>
                {transaksi.statusTransaksi}
              </p>
          </div>
        </div>

        {/* Alamat Pengiriman */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-semibold">Alamat:</span> {transaksi.alamatPengiriman.alamat}</p>
            <p><span className="font-semibold">Kota:</span> {transaksi.alamatPengiriman.kota}</p>
            <p><span className="font-semibold">Kode Pos:</span> {transaksi.alamatPengiriman.kodePos}</p>
          </div>
        </div>

        {/* Produk */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Produk yang Dibeli</h2>
          <div className="space-y-4">
            {transaksi.cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border p-4 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.nama}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-sm text-gray-500">Jumlah: {item.qty}</p>
                    <p className="text-sm text-gray-500">Harga Satuan: Rp {item.harga.toLocaleString()}</p>
                  </div>
                </div>
                <div className="font-semibold text-gray-700 text-right">
                  Subtotal: Rp {(item.harga * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metode Pembayaran dan Total */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-600">Metode Pembayaran:</p>
            <p className="font-semibold">{transaksi.metodePembayaran}</p>
          </div>
          <div>
            <p className="text-gray-600 text-right">Total Harga:</p>
            <p className="text-2xl font-bold text-blue-600 text-right">Rp {transaksi.totalHarga.toLocaleString()}</p>
          </div>
        </div>

        {/* Tombol Aksi */}
        {transaksi.statusPembayaran !== 'Sudah Dibayar' && (
          <div className="flex flex-col md:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => navigate(`/pembayaran/${transaksi._id}`)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Bayar Sekarang
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Batalkan Transaksi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTransaksiPage;
