import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProdukItem = ({ produk }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userToken = localStorage.getItem('userToken');
      setIsLoggedIn(!!(user?.token || userToken));
    };

    checkLogin();

    window.addEventListener('storage', checkLogin);
    window.addEventListener('focus', checkLogin);
    window.addEventListener('userChanged', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('focus', checkLogin);
      window.removeEventListener('userChanged', checkLogin);
    };
  }, []);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Silakan login terlebih dahulu untuk menambahkan ke keranjang.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item._id === produk._id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        _id: produk._id,
        nama: produk.nama,
        harga: produk.harga,
        image: produk.image,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Produk berhasil ditambahkan ke keranjang!');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Gambar dengan aspect-ratio square agar ukuran seragam */}
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:5000/uploads/${produk.image}`}
          alt={produk.nama}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Konten */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{produk.nama}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{produk.deskripsi}</p>
        <p className="text-blue-600 font-bold">Rp {produk.harga?.toLocaleString('id-ID')}</p>

        <button
          onClick={handleAddToCart}
          disabled={!isLoggedIn}
          className={`mt-3 px-2 py-2 rounded-full flex items-center justify-center gap-2 transition 
            ${isLoggedIn ? 'bg-blue-600 hover:bg-blue-400 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {/* <ShoppingCart size={16} /> */}
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProdukItem;
