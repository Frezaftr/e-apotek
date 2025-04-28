// frontend/pages/History.jsx
import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../api/userApi'; // Panggil dari userApi.js

const History = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getTransactionHistory(); // Panggil API
        setTransaksi(data); // Update transaksi
      } catch (error) {
        console.error('Gagal mengambil data transaksi:', error.message);
      } finally {
        setLoading(false); // Hentikan loading
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>

      {transaksi.length === 0 ? (
        <p className="text-gray-600 text-center">Belum ada transaksi.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transaksi.map((trx) => (
            <div key={trx._id} className="border rounded-lg shadow-md p-5 hover:shadow-lg transition">
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Tanggal:</span>{' '}
                  {new Date(trx.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total Harga:</span>{' '}
                  Rp {trx.totalHarga.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Status Pembayaran:</span>{' '}
                  <span className={trx.statusPembayaran === 'Sudah Dibayar' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {trx.statusPembayaran}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Produk:</h2>
                <ul className="list-disc ml-5 space-y-1 text-gray-600">
                  {trx.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.namaProduk} x {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
