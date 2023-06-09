const {
  executeQuery,
} = require('../helpers');

// GET /orders - Memanggil daftar order pengguna
const getAllOrdersHandler = async (request, h) => {
  const query = 'SELECT * FROM orders';

  try {
    const orders = await executeQuery(query);
    return h.response({
      status: 'success',
      data: orders,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil pesanan:', error);
    return h.response({
      status: 'error',
      message: 'Gagal saat memanggil pesanan',
    }).code(500);
  }
};

// GET /orders/:orderId - Memanggil order tertentu
const getOrderByIdHandler = async (request, h) => {
  const { orderId } = request.params;
  const query = 'SELECT * FROM orders WHERE orderId = ?';
  const values = [orderId];

  try {
    const orders = await executeQuery(query, values);
    if (orders.length > 0) {
      return h.response({
        status: 'success',
        data: orders[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Pesanan tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat memanggil pesanan:', error);
    return h.response({
      status: 'error',
      massage: 'Gagal memanggil pesanan',
    }).code(500);
  }
};

// POST /orders: Membuat order baru
const creteOrderHandler = async (request, h) => {
  const {
    userId, ticketId, quantity, orderType,
  } = request.payload;
  const orderDate = new Date().toISOString();
  const status = 'pending';

  const query = 'INSERT INTO Orders (userId, ticketId, quantity, orderDate, status, orderType) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [userId, ticketId, quantity, orderDate, status, orderType];

  try {
    const result = await executeQuery(query, values);
    const createdOrderId = result.insertId;
    return h.response({
      status: 'success',
      message: 'Pesanan telah dibuat',
      data: {
        orderId: createdOrderId,
      },
    }).code(201);
  } catch (error) {
    console.error('Error saat membuat pesanan:', error);
    return h.response({
      status: 'error',
      message: 'Gagal membuat pesanan',
    }).code(500);
  }
};

// PUT /orders/:orderId - Mengupdate status order tertentu
const updateOrderStatusHandler = async (request, h) => {
  const { orderId } = request.params;
  const { status } = request.payload;
  const query = 'UPDATE Orders SET status = ? WHERE orderId = ?';
  const values = [status, orderId];

  try {
    const result = await executeQuery(query, values);
    if (result.affectedRows > 0) {
      return h.response({
        status: 'success',
        message: 'Status pesanan telah di update',
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Order tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat mengupdate status pesanan:', error);
    return h.response({
      status: 'error',
      message: 'gagal mengupdate status pesanan',
    }).code(500);
  }
};

// DELETE /orders/:orderId - Mengcancel orderan
const cancelOrderHandler = async (request, h) => {
  const { orderId } = request.params;
  const query = 'DELETE FROM Orders WHERE orderId = ?';
  const values = [orderId];

  try {
    const result = await executeQuery(query, values);
    if (result.affectedRows > 0) {
      return h.response({
        status: 'success',
        message: 'Pesanan dibatalkan',
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Pesanan tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat membatalkan pesanan:', error);
    return h.response({
      status: 'error',
      message: 'Gagal membatalkan pesanan',
    }).code(500);
  }
};

module.exports = {
  getAllOrdersHandler,
  getOrderByIdHandler,
  creteOrderHandler,
  updateOrderStatusHandler,
  cancelOrderHandler,
};
