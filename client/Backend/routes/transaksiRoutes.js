import express from 'express';
import { buatTransaksi, getMyTransaksi } from '../controllers/transaksiController.js';
import { protect, isUser } from '../middleware/authMiddleware.js'; // <- pastikan isUser di-import

const router = express.Router();

// Route untuk membuat transaksi baru
router.post('/', protect, buatTransaksi);

// Route untuk mendapatkan riwayat transaksi
router.get('/history', protect, isUser, getMyTransaksi);

export default router;
