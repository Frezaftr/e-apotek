import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DetailTransaksiPage = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };

        const { data } = await axios.get(`http://localhost:5000/api/transaksi/${id}`, config);
        setTransaksi(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Gagal mengambil detail transaksi.');
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!transaksi) {
    return <div className="text-center py-10">Transaksi tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Detail Transaksi</h2>

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <div>
          <h3 className="font-semibold">Alamat Pengiriman</h3>
          <p>{transaksi.alamatPengiriman.alamat}, {transaksi.alamatPengiriman.kota}, {transaksi.alamatPengiriman.kodePos}</p>
        </div>

        <div>
          <h3 className="font-semibold">Metode Pembayaran</h3>
          <p>{transaksi.metodePembayaran}</p>
        </div>

        <div>
          <h3 className="font-semibold">Status Pembayaran</h3>
          <p className={transaksi.isPaid ? 'text-green-600' : 'text-red-600'}>
            {transaksi.isPaid ? 'Sudah Dibayar' : 'Belum Dibayar'}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Produk</h3>
          <ul className="space-y-2">
            {transaksi.cartItems.map((item) => (
              <li key={item.produk} className="flex justify-between">
                <span>{item.nama} (x{item.qty})</span>
                <span>Rp {item.harga.toLocaleString('id-ID')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-lg font-bold text-right">
          Total: Rp {transaksi.totalHarga.toLocaleString('id-ID')}
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksiPage;
