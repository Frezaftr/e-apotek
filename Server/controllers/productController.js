import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk', error: error.message });
  }
};

// ✅ Add new product
export const createProduct = async (req, res) => {
  try {
    const { nama, deskripsi, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : '';

    const newProduct = new Product({
      nama,
      deskripsi,
      harga,
      stok,
      image: gambar,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('ERROR CREATE PRODUK:', error.message);
    res.status(500).json({ message: 'Gagal menambahkan produk', error: error.message });
  }
};

// ✅ Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { nama, deskripsi, harga, stok } = req.body;
  const gambar = req.file ? req.file.filename : null;
  const produkId = req.params.id;

  try {
    const produk = await Product.findById(produkId);

    if (produk) {
      produk.nama = nama || produk.nama;
      produk.deskripsi = deskripsi || produk.deskripsi;
      produk.harga = harga || produk.harga;
      produk.stok = stok || produk.stok;

      if (gambar) {
        // Delete old image if it exists
        if (produk.image && fs.existsSync(path.join(uploadDir, produk.image))) {
          fs.unlinkSync(path.join(uploadDir, produk.image));
        }
        produk.image = gambar;
      }

      const updatedProduk = await produk.save();
      res.json(updatedProduk);
    } else {
      res.status(404);
      throw new Error('Produk tidak ditemukan');
    }
  } catch (error) {
    console.error('ERROR UPDATE PRODUK:', error.message);
    res.status(500).json({ message: 'Gagal memperbarui produk', error: error.message });
  }
});

// ✅ Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const produkId = req.params.id;
    const produk = await Product.findById(produkId);

    if (produk) {
      // Delete image if it exists
      if (produk.image && fs.existsSync(path.join(uploadDir, produk.image))) {
        fs.unlinkSync(path.join(uploadDir, produk.image));
      }
      await Product.deleteOne({ _id: produkId });
      res.json({ message: 'Produk berhasil dihapus' });
    } else {
      res.status(404);
      throw new Error('Produk tidak ditemukan');
    }
  } catch (error) {
    console.error('ERROR DELETE PRODUK:', error.message);
    res.status(500).json({ message: 'Gagal menghapus produk', error: error.message });
  }
});

export { getProducts, createProduct, updateProduct, deleteProduct };
