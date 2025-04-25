import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, isAdmin, upload.single('gambar'), createProduct);

export default router;
