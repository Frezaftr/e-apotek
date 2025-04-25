import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  deskripsi: {
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
    default: 0,
  },
  kategori: {
    type: String,
    default: 'Umum',
  },
  gambar: {
    type: String, // path ke file gambar
    required: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
