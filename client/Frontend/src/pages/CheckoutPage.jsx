import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noHp: '',
    alamat: '',
    kota: '',
    kodePos: '',
    metodePembayaran: 'Bank Transfer', // default
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);

    const total = cart.reduce((acc, item) => acc + (item.harga * item.quantity), 0);
    setTotalHarga(total);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBayar = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.error('Silakan login terlebih dahulu');
        return;
      }

      const transaksiData = {
        user: user._id,
        cartItems: cartItems.map(item => ({
          nama: item.nama,
          qty: item.quantity,
          image: item.image,
          harga: item.harga,
          produk: item._id,
        })),
        alamatPengiriman: {
          alamat: formData.alamat,
          kota: formData.kota,
          kodePos: formData.kodePos,
        },
        metodePembayaran: formData.metodePembayaran,
        totalHarga,
        statusPembayaran: 'Belum Dibayar',
      };

      await axios.post('http://localhost:5000/api/transaksi', transaksiData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success('Pesanan berhasil dibuat!');
      localStorage.removeItem('cart');
      navigate('/'); // redirect ke home atau riwayat pesanan
    } catch (error) {
      console.error(error);
      toast.error('Gagal membuat pesanan.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <button
        onClick={() => navigate('/cart')}
        className="mb-4 text-green-600 hover:underline"
      >
        ← Kembali ke Keranjang
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form pengiriman */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Informasi Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="nama" placeholder="Nama Lengkap" value={formData.nama} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="noHp" placeholder="No HP" value={formData.noHp} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="kota" placeholder="Kota" value={formData.kota} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="alamat" placeholder="Alamat Lengkap" value={formData.alamat} onChange={handleInputChange} className="border p-2 rounded col-span-2" />
            <input type="text" name="kodePos" placeholder="Kode Pos" value={formData.kodePos} onChange={handleInputChange} className="border p-2 rounded" />
          </div>

          {/* Metode Pembayaran */}
          <div className="mt-4">
            <label className="block mb-2">Metode Pembayaran</label>
            <select name="metodePembayaran" value={formData.metodePembayaran} onChange={handleInputChange} className="border p-2 rounded w-full">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet</option>
              {/* Nanti bisa tambah Payment Gateway */}
            </select>
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.nama} x {item.quantity}</span>
                <span>Rp {item.harga.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Pengiriman</span>
            <span>Rp 0</span> {/* Free ongkir untuk awal */}
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total</span>
            <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
          </div>

          <button
            onClick={handleBayar}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Bayar Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
