import mongoose from 'mongoose'

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
  gambar: {
    type: String, // URL gambar
    required: true,
  },
}, {
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

export default Product
