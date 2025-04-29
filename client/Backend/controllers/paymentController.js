// backend/controllers/paymentController.js
import midtransClient from 'midtrans-client';
import Transaksi from '../models/transaksiModel.js'; // pastikan import model Transaksi

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-ZIUorZHs3DDMUOL912J-sj0o', // SERVER KEY kamu
});

export const notificationHandler = async (req, res) => {
  try {
    const notification = req.body;

    const statusResponse = await snap.transaction.notification(notification);

    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log('Notif Midtrans:', { orderId, transactionStatus, fraudStatus });

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      // Update transaksi menjadi sudah dibayar
      await Transaksi.findByIdAndUpdate(orderId, {
        status: 'Sudah Dibayar',
      });
      console.log(`Transaksi ${orderId} sudah dibayar.`);
    } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
      await Transaksi.findByIdAndUpdate(orderId, {
        status: 'Gagal',
      });
      console.log(`Transaksi ${orderId} gagal.`);
    } else if (transactionStatus === 'pending') {
      await Transaksi.findByIdAndUpdate(orderId, {
        status: 'Menunggu Pembayaran',
      });
      console.log(`Transaksi ${orderId} pending.`);
    }

    res.status(200).json({ message: 'Notification processed' });
  } catch (error) {
    console.error('Error handling Midtrans notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
