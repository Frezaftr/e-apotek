import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const History = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          console.error('Token tidak tersedia. Harap login ulang.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/transaksi/history', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransaksi(response.data);
      } catch (error) {
        console.error('Gagal memuat riwayat transaksi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transaksi.map((trx) => (
            <div
              key={trx._id}
              className="border rounded-xl shadow-lg p-6 hover:shadow-2xl transition bg-white flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Tanggal:</span>{' '}
                  {new Date(trx.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Total:</span> Rp {trx.totalHarga.toLocaleString()}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={trx.statusPembayaran === 'Sudah Dibayar' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {trx.statusPembayaran}
                  </span>
                </p>
                <div className="mb-2">
                  <h2 className="font-semibold mb-1">Produk:</h2>
                  <ul className="list-disc ml-5 space-y-1 text-gray-600">
                    {trx.cartItems.map((item, index) => (
                      <li key={index}>{item.nama} x {item.qty}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => navigate(`/transaksi/${trx._id}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Detail Transaksi
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
