// backend/services/midtransService.js
const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: false, // masih Sandbox
  serverKey: 'YOUR_SERVER_KEY', // Ganti pakai Server Key dari Midtrans Sandbox
});

const createTransaction = async (orderId, grossAmount) => {
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  return transaction;
};

module.exports = { createTransaction };
