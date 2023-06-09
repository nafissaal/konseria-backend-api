const {
  executeQuery,
} = require('../helpers');

// GET /payments - Get all payments
const getAllPaymentsHandler = async (request, h) => {
  const query = 'SELECT * FROM Payments';

  try {
    const payments = await executeQuery(query);
    return h.response({
      status: 'success',
      data: payments,
    }).code(200);
  } catch (error) {
    console.error('Error saat menampilkan pembayaran:', error);
    return h.response({
      status: 'error',
      message: 'Error saat menampilkan pembayaran',
    }).code(500);
  }
};

// GET /payments/{paymentID} - Get a specific payment by paymentID
const getPaymentByIdHandler = async (request, h) => {
  const { paymentId } = request.params;
  const query = 'SELECT * FROM Payments WHERE paymentId = ?';
  const values = [paymentId];

  try {
    const payments = await executeQuery(query, values);
    if (payments.length > 0) {
      return h.response({
        status: 'success',
        data: payments[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Pembayaran tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error memuat pesanan:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memuat pesanan',
    }).code(500);
  }
};

// POST /payments - Create a new payment
const createPaymentHandler = async (request, h) => {
  const {
    orderId, paymentDate, amount, paymentType,
  } = request.payload;
  const query = 'INSERT INTO Payments (orderId, paymentDate, amount, paymentType) VALUES (?, ?, ?, ?)';
  const values = [orderId, paymentDate, amount, paymentType];

  try {
    await executeQuery(query, values);
    return h.response({
      status: 'success',
      message: 'Pembayaran telah masuk',
    }).code(201);
  } catch (error) {
    console.error('Error saat melakukan pembayaran:', error);
    return h.response({
      status: 'error',
      message: 'Gagal melakukan pembayaran',
    }).code(500);
  }
};

// PUT /payments/{paymentId} - Update a specific payment by paymentID
const updatePaymentHandler = async (request, h) => {
  const { paymentId } = request.params;
  const {
    orderId, paymentDate, amount, paymentType,
  } = request.payload;
  const query = 'UPDATE Payments SET orderId = ?, paymentDate = ?, amount = ?, paymentType = ? WHERE paymentId = ?';
  const values = [orderId, paymentDate, amount, paymentType, paymentId];

  try {
    await executeQuery(query, values);
    return h.response({
      status: 'success',
      message: 'Pembayaran telah diupdate',
    }).code(200);
  } catch (error) {
    console.error('Error mengupdate pembayaran:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengupdate pembayaran',
    }).code(500);
  }
};

// DELETE /payments/{paymentId} - Delete a specific payment by paymentID
const deletePaymentHandler = async (request, h) => {
  const { paymentId } = request.params;
  const query = 'DELETE FROM Payments WHERE paymentId = ?';
  const values = [paymentId];

  try {
    await executeQuery(query, values);
    return h.response({
      status: 'success',
      message: 'Pembayaran telah dihapus',
    }).code(200);
  } catch (error) {
    console.error('Error saat menghapus pembayaran:', error);
    return h.response({
      status: 'error',
      message: 'Gagal menghapus pembayaran',
    }).code(500);
  }
};

module.exports = {
  getAllPaymentsHandler,
  getPaymentByIdHandler,
  createPaymentHandler,
  updatePaymentHandler,
  deletePaymentHandler,
};
