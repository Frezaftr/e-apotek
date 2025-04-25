import React, { useEffect, useState } from 'react';
import ProdukItem from '../components/ProdukItem';

const Produk = () => {
  const [produkList, setProdukList] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/produk');
        const data = await response.json();
        setProdukList(data);
        setFilteredProduk(data);
        setLoading(false);
      } catch (err) {
        console.error('Gagal ambil data produk:', err);
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  useEffect(() => {
    let filtered = produkList;

    if (search) {
      filtered = filtered.filter(p =>
        p.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (kategori) {
      filtered = filtered.filter(p => p.kategori === kategori);
    }

    setFilteredProduk(filtered);
  }, [search, kategori, produkList]);

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Search dan Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Cari produk di sini..."
            className="w-full md:w-[60%] border border-gray-300 rounded-full px-6 py-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-[30%] mt-4 md:mt-0 border border-gray-300 rounded-full px-6 py-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="Obat">Obat</option>
            <option value="Vitamin">Vitamin</option>
            <option value="Alat Kesehatan">Alat Kesehatan</option>
          </select>
        </div>

        {/* Produk Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat data produk...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduk.map((produk, index) => (
              <ProdukItem key={produk._id || index} produk={produk} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Produk;
