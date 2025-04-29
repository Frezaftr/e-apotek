import express from 'express';
import {
  buatTransaksi,
  getMyTransaksi,
  getDetailTransaksi
} from '../controllers/transaksiController.js';
import { protect, isUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// ➕ Buat transaksi baru
router.post('/', protect, buatTransaksi);

// 📜 Riwayat transaksi user
router.get('/history', protect, isUser, getMyTransaksi);

// 🔍 Detail transaksi berdasarkan ID
router.get('/:id', protect, isUser, getDetailTransaksi);

export default router;
