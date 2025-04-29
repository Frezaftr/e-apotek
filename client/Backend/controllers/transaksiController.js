import asyncHandler from 'express-async-handler';
import Transaksi from '../models/transaksiModel.js';

// ➕ Buat transaksi baru
export const buatTransaksi = asyncHandler(async (req, res) => {
  const { cartItems, alamatPengiriman, metodePembayaran, totalHarga } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('Tidak ada produk dalam keranjang');
  }

  const transaksi = new Transaksi({
    user: req.user._id,
    cartItems,
    alamatPengiriman,
    metodePembayaran,
    totalHarga,
    statusPembayaran: 'Belum Dibayar',
    status: 'draft',
  });

  const createdTransaksi = await transaksi.save();
  res.status(201).json(createdTransaksi);
});

// 📜 Ambil riwayat transaksi user
export const getMyTransaksi = asyncHandler(async (req, res) => {
  const transaksi = await Transaksi.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(transaksi);
});

// 🔍 Ambil detail transaksi berdasarkan ID
export const getDetailTransaksi = asyncHandler(async (req, res) => {
  const transaksi = await Transaksi.findById(req.params.id);

  if (!transaksi) {
    res.status(404);
    throw new Error('Transaksi tidak ditemukan');
  }

  if (transaksi.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Tidak diizinkan mengakses transaksi ini');
  }

  res.json(transaksi);
});

// 🔁 Update status transaksi secara umum (admin/manual)
export const updateStatusTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const transaksi = await Transaksi.findById(id);

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    transaksi.status = status;
    await transaksi.save();

    res.json({ message: "Status transaksi berhasil diupdate", transaksi });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat update status transaksi" });
  }
};

// ✅ Konfirmasi pembayaran dari user
export const konfirmasiBayarTransaksi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaksi = await Transaksi.findById(id);

  if (!transaksi) {
    res.status(404);
    throw new Error('Transaksi tidak ditemukan');
  }

  // Pastikan hanya user yang sama yang boleh ubah
  if (transaksi.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Anda tidak memiliki izin untuk mengubah transaksi ini');
  }

  transaksi.statusPembayaran = 'Sudah Dibayar';
  transaksi.status = 'pending';

  await transaksi.save();

  res.json({ message: 'Pembayaran berhasil dikonfirmasi', transaksi });
});
