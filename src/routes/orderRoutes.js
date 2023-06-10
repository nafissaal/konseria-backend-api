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
    path: '/konseria/orders',
    handler: getAllOrdersHandler,
  },

  {
    method: 'GET',
    path: '/konseria/orders/{orderId}',
    handler: getOrderByIdHandler,
  },

  {
    method: 'POST',
    path: '/konseria/orders',
    handler: creteOrderHandler,
  },

  {
    method: 'PUT',
    path: '/konseria/orders/{orderId}',
    handler: updateOrderStatusHandler,
  },

  {
    method: 'DELETE',
    path: '/konseria/orders/{orderId}',
    handler: cancelOrderHandler,
  },
];

module.exports = orderRoutes;
