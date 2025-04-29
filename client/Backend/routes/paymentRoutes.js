import express from 'express';
import midtransClient from 'midtrans-client';
import Transaksi from '../models/transaksiModel.js';

const router = express.Router();

router.post('/webhook', express.json(), async (req, res) => {
  const notif = req.body;

  try {
    const apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const statusResponse = await apiClient.transaction.notification(notif);

    const { order_id, transaction_status } = statusResponse;

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      await Transaksi.findOneAndUpdate({ _id: order_id }, { status: 'Sudah Dibayar' });
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
