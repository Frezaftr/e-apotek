import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const ProdukItem = ({ produk, qty = 0, onAdd, onIncrement, onDecrement }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative group">
      {/* Gambar Produk */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={produk.image ? `http://localhost:5000/uploads/${produk.image}` : '/default.jpg'}
          alt={produk.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Konten Produk */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{produk.nama}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{produk.deskripsi}</p>
        <p className="text-blue-600 font-bold text-md">
          Rp {produk.harga?.toLocaleString()}
        </p>

        {/* Kontrol Keranjang */}
        <div className="flex items-center gap-2 mt-3">
          <button onClick={onDecrement} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <Minus size={16} />
          </button>
          <span className="min-w-[20px] text-center">{qty}</span>
          <button onClick={onIncrement} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <Plus size={16} />
          </button>
          <button
            onClick={onAdd}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdukItem;
