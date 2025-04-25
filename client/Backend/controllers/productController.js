import Product from '../models/Product.js';

// ✅ Get semua produk
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk', error: error.message });
  }
};

// ✅ Tambahkan produk baru (dengan upload gambar)
export const createProduct = async (req, res) => {
  try {
    const { nama, deskripsi, harga } = req.body;
    const gambar = req.file ? req.file.filename : '';

    const newProduct = new Product({
      nama,
      deskripsi,
      harga,
      gambar,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan produk', error: error.message });
  }
};
