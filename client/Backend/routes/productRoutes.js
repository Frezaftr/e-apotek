import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Produk from '../models/Product.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buat folder upload jika belum ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ✅ Route GET semua produk
router.get('/', async (req, res) => {
  try {
    const produk = await Produk.find();
    res.json(produk);
  } catch (error) {
    console.error('ERROR GET PRODUK:', error.message);
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
});

// ✅ Route POST produk baru
router.post('/', protect, isAdmin, upload.single('gambar'), async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const produkBaru = new Produk({
      nama,
      harga,
      stok,
      image: gambar,
    });

    const simpan = await produkBaru.save();
    res.status(201).json(simpan);
  } catch (error) {
    console.error('ERROR CREATE PRODUK:', error.message);
    res.status(500).json({ message: 'Gagal menambahkan produk' });
  }
});

export default router;
