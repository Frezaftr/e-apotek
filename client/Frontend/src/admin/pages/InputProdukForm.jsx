import { useState } from "react";
import axios from "axios";

const InputProdukForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",
  });

  const [gambar, setGambar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let filename = "";

      // Upload gambar jika ada
      if (gambar) {
        const uploadData = new FormData();
        uploadData.append("gambar", gambar);

        const uploadRes = await axios.post("http://localhost:5000/api/upload", uploadData, {
          withCredentials: true,
        });

        filename = uploadRes.data.filename;
      }

      // Kirim data produk
      const produkData = { ...formData, gambar: filename };
      await axios.post("http://localhost:5000/api/products", produkData, {
        withCredentials: true,
      });

      alert("Produk berhasil ditambahkan!");
      setFormData({ nama: "", deskripsi: "", harga: "", stok: "" });
      setGambar(null);
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan produk.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>

      <input
        type="text"
        name="nama"
        placeholder="Nama Produk"
        value={formData.nama}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <textarea
        name="deskripsi"
        placeholder="Deskripsi Produk"
        value={formData.deskripsi}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="number"
        name="harga"
        placeholder="Harga"
        value={formData.harga}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="number"
        name="stok"
        placeholder="Stok"
        value={formData.stok}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="file"
        name="gambar"
        onChange={handleFileChange}
        className="w-full p-2 mb-3 border rounded"
        accept="image/*"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Tambah Produk
      </button>
    </form>
  );
};

export default InputProdukForm;
