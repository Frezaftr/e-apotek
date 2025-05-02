import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const History = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPembayaran, setFilterPembayaran] = useState('');
  const [filterTransaksi, setFilterTransaksi] = useState('');
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

  const filteredTransaksi = transaksi.filter((trx) => {
    const cocokPembayaran = filterPembayaran ? trx.statusPembayaran === filterPembayaran : true;
    const cocokTransaksi = filterTransaksi ? trx.statusTransaksi === filterTransaksi : true;
    return cocokPembayaran && cocokTransaksi;
  });

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div>
          <label className="block font-medium mb-1">Filter Status Pembayaran:</label>
          <select
            value={filterPembayaran}
            onChange={(e) => setFilterPembayaran(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua</option>
            <option value="Belum Dibayar">Belum Dibayar</option>
            <option value="Sudah Dibayar">Sudah Dibayar</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Filter Status Transaksi:</label>
          <select
            value={filterTransaksi}
            onChange={(e) => setFilterTransaksi(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua</option>
            <option value="pending">Pending</option>
            <option value="cancel">Cancel</option>
            <option value="delivery">Delivery</option>
            <option value="success">Success</option>
          </select>
        </div>
      </div>

      {filteredTransaksi.length === 0 ? (
        <p className="text-gray-600 text-center">Tidak ada transaksi sesuai filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransaksi.map((trx) => (
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
                <p className="mb-1">
                  <span className="font-semibold">Status Pembayaran:</span>{' '}
                  <span className={trx.statusPembayaran === 'Sudah Dibayar' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {trx.statusPembayaran}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Status Transaksi:</span>{' '}
                  <span className={
                    trx.statusTransaksi === 'cancel' ? 'text-red-600 font-bold' :
                    trx.statusTransaksi === 'pending' ? 'text-yellow-600 font-bold' :
                    trx.statusTransaksi === 'delivery' ? 'text-blue-600 font-bold' :
                    trx.statusTransaksi === 'success' ? 'text-green-600 font-bold' : ''
                  }>
                    {trx.statusTransaksi}
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
