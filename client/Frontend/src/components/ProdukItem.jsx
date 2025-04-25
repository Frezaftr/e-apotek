import React from 'react';

const ProdukItem = ({ produk }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={produk.gambar ? `http://localhost:5000/uploads/${produk.gambar}` : '/default.jpg'}
        alt={produk.nama}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{produk.nama}</h3>
      <p className="text-gray-600 text-sm mt-2">{produk.deskripsi}</p>
      <p className="text-blue-600 font-bold mt-2">
        Rp {produk.harga?.toLocaleString()}
      </p>
    </div>
  );
};

export default ProdukItem;
