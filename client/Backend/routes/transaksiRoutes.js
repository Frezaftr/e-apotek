import express from 'express';
import {
  buatTransaksi,
  getMyTransaksi,
  getDetailTransaksi,
  updateStatusTransaksi,
  konfirmasiBayarTransaksi // ✅ tambahan
} from '../controllers/transaksiController.js';
import { protect, isUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// ➕ Buat transaksi baru
router.post('/', protect, buatTransaksi);

// 📜 Riwayat transaksi user
router.get('/history', protect, isUser, getMyTransaksi);

// 🔍 Detail transaksi berdasarkan ID
router.get('/:id', protect, isUser, getDetailTransaksi);

// 🔁 Update status transaksi (admin/manual)
router.put('/:id/status', updateStatusTransaksi);

// ✅ Konfirmasi pembayaran user
router.put('/:id/konfirmasi-bayar', protect, isUser, konfirmasiBayarTransaksi);

export default router;
