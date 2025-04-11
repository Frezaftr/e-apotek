import React, { useEffect, useState } from 'react'
import ProdukItem from '../components/ProdukItem'

const Produk = () => {
  const [produkList, setProdukList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        setProdukList(data)
        setLoading(false)
      } catch (err) {
        console.error('Gagal ambil data produk:', err)
        setLoading(false)
      }
    }

    fetchProduk()
  }, [])

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Produk Kami</h2>
        {loading ? (
          <p className="text-center text-gray-500">Memuat data produk...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {produkList.map((produk) => (
              <ProdukItem key={produk._id} produk={produk} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Produk
