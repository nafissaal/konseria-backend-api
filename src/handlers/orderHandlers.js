const { nanoid } = require('nanoid');
const orders = require('../data/orders');

// GET /orders - Memanggil daftar order pengguna
const getAllOrdersHandler = () => ({
  status: 'success',
  data: {
    orders,
  },
});

// GET /orders/:orderId - Memanggil order tertentu
const getOrderByIdHandler = (request, h) => {
  const { orderID } = request.params;

  const order = orders.filter((o) => o.id === orderID)[0];

  if (order) {
    const response = h
      .response({
        status: 'success',
        data: {
          order,
        },
      });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Order tidak ditemukan',
  });
  response.code(404);
  return response;
};
// POST /orders: Membuat order baru
// PUT /orders/:orderId - Mengupdate status order tertentu
// DELETE /orders/:orderId - Mengcancel orderan

module.exports = {
  getAllOrdersHandler,
  getOrderByIdHandler,
};
