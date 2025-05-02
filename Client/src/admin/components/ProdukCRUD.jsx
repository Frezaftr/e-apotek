import { useEffect, useState } from 'react';
import { createProduk, getProduk, deleteProduk, updateProduk } from '../../api/produk.Api';

const ProdukCRUD = () => {
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({ nama: '', harga: '', stok: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchProduk = async () => {
    const data = await getProduk();
    setProduk(data);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama', form.nama);
    formData.append('harga', form.harga);
    formData.append('stok', form.stok);
    if (imageFile) formData.append('gambar', imageFile); // 👈 harus 'gambar', bukan 'image'

    if (editingId) {
      await updateProduk(editingId, formData);
      setEditingId(null);
    } else {
      await createProduk(formData);
    }

    setForm({ nama: '', harga: '', stok: '', image: '' });
    setImageFile(null);
    fetchProduk();
  };

  const handleEdit = (item) => {
    setForm({
      nama: item.nama,
      harga: item.harga,
      stok: item.stok,
      image: item.image,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await deleteProduk(id);
    fetchProduk();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manajemen Produk</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2" encType="multipart/form-data">
        <input name="nama" placeholder="Nama Produk" value={form.nama} onChange={handleChange} className="border p-2 w-full" required />
        <input name="harga" placeholder="Harga" type="number" value={form.harga} onChange={handleChange} className="border p-2 w-full" required />
        <input name="stok" placeholder="Stok" type="number" value={form.stok} onChange={handleChange} className="border p-2 w-full" required />
        <input name="gambar" type="file" onChange={handleImageChange} className="border p-2 w-full" accept="image/*" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Tambah'} Produk
        </button>
      </form>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Gambar</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Stok</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item._id}>
              <td className="p-2">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.nama}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="p-2">{item.nama}</td>
              <td className="p-2">Rp {Number(item.harga).toLocaleString()}</td>
              <td className="p-2">{item.stok}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 px-2 py-1 rounded text-white">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-600 px-2 py-1 rounded text-white">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukCRUD;
