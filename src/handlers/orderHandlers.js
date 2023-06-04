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
      message: 'Error saat memanggil pesanan',
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
// PUT /orders/:orderId - Mengupdate status order tertentu
// DELETE /orders/:orderId - Mengcancel orderan

module.exports = {
  getAllOrdersHandler,
  getOrderByIdHandler,
};
