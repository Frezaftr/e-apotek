import React from 'react'

const ProdukItem = ({ produk }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
      <img src={produk.image} alt={produk.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{produk.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{produk.description}</p>
      <p className="text-blue-600 font-bold mt-2">Rp {produk.price.toLocaleString()}</p>
    </div>
  )
}

export default ProdukItem
