import mongoose from 'mongoose';

const produkSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  }
}, { timestamps: true });

const Produk = mongoose.model('Products', produkSchema);
export default Produk;
