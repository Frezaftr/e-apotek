// backend/controllers/transaksiController.js

import asyncHandler from 'express-async-handler';
import Transaksi from '../models/transaksiModel.js';

// @desc    Checkout - Buat Transaksi Baru
// @route   POST /api/transaksi
// @access  Private (User)

// yang sudah ada
export const buatTransaksi = asyncHandler(async (req, res) => {
    const { cartItems, alamatPengiriman, metodePembayaran, totalHarga } = req.body;
  
    if (!cartItems || cartItems.length === 0) {
      res.status(400);
      throw new Error('Tidak ada produk dalam keranjang');
    }
  
    const transaksi = new Transaksi({
      user: req.user.id,
      cartItems,
      alamatPengiriman,
      metodePembayaran,
      totalHarga,
      statusPembayaran: 'Belum Dibayar',
    });
  
    const createdTransaksi = await transaksi.save();
    res.status(201).json(createdTransaksi);
  });
  
  // ➡️ Tambahkan controller baru
  export const getMyTransaksi = asyncHandler(async (req, res) => {
    const transaksi = await Transaksi.find({ user: req.user.id }).sort({ createdAt: -1 });
  
    res.json(transaksi);
  });
  
