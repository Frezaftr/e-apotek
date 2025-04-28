// backend/models/transaksiModel.js

import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
  nama: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  harga: { type: Number, required: true },
  produk: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Produk' 
  },
}, { _id: false });

const transaksiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [cartItemSchema],
    alamatPengiriman: {
      alamat: { type: String, required: true },
      kota: { type: String, required: true },
      kodePos: { type: String, required: true },
    },
    metodePembayaran: {
      type: String,
      required: true,
    },
    totalHarga: {
      type: Number,
      required: true,
      default: 0.0,
    },
    statusPembayaran: {
      type: String,
      required: true,
      enum: ['Belum Dibayar', 'Sudah Dibayar'],
      default: 'Belum Dibayar',
    },
  },
  {
    timestamps: true,
  }
);

const Transaksi = mongoose.model('Transaksi', transaksiSchema);

export default Transaksi;
