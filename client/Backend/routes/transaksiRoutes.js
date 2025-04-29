import express from 'express';
import {
  buatTransaksi,
  getMyTransaksi,
  getDetailTransaksi,
  updateStatusTransaksi,
  konfirmasiBayarTransaksi // ✅ tambahan
} from '../controllers/transaksiController.js';
import { protect, isAdmin , isUser } from '../middleware/authMiddleware.js';
import { getAllTransaksi } from '../controllers/transaksiController.js';


const router = express.Router();

// ➕ Buat transaksi baru
router.post('/', protect, buatTransaksi);

// 📜 Riwayat transaksi user
router.get('/history', protect, isUser, getMyTransaksi);

// 🔍 Detail transaksi berdasarkan ID
router.get('/:id', protect, isUser, getDetailTransaksi);

// 🔁 Update status transaksi (admin/manual)
router.put('/:id/status', protect, isAdmin, updateStatusTransaksi);

// ✅ Konfirmasi pembayaran user
router.put('/:id/konfirmasi-bayar', protect, isUser, konfirmasiBayarTransaksi);

router.get('/', protect, isAdmin, getAllTransaksi);

export default router;
