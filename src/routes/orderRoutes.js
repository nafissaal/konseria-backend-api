const {
  getAllOrdersHandler,
  getOrderByIdHandler,
  creteOrderHandler,
  updateOrderStatusHandler,
  cancelOrderHandler,
} = require('../handlers/orderHandlers');

const orderRoutes = [
  {
    method: 'GET',
    path: '/orders',
    handler: getAllOrdersHandler,
  },

  {
    method: 'GET',
    path: '/orders/{orderId}',
    handler: getOrderByIdHandler,
  },

  {
    method: 'POST',
    path: '/orders',
    handler: creteOrderHandler,
  },

  {
    method: 'PUT',
    path: '/orders/{orderId}',
    handler: updateOrderStatusHandler,
  },

  {
    method: 'DELETE',
    path: '/orders/{orderId}',
    handler: cancelOrderHandler,
  },
];

module.exports = orderRoutes;
