// routes/adminRoutes.js
import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin); // ❌ TIDAK perlu protect / isAdmin

export default router;
