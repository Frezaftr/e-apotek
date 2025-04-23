import express from 'express';
import Product from '../models/Product.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js'; // import middleware

const router = express.Router();

// GET semua produk
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST produk baru - hanya admin
router.post('/', protect, isAdmin, async (req, res) => {
  const { nama, deskripsi, harga, stok, kategori, gambar } = req.body;

  const newProduct = new Product({
    nama,
    deskripsi,
    harga,
    stok,
    kategori,
    gambar,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
