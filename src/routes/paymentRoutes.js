const {
  getAllPaymentsHandler,
  getPaymentByIdHandler,
  createPaymentHandler,
  updatePaymentHandler,
  deletePaymentHandler,
} = require('../handlers/paymentHandlers');

const paymentRoutes = [
  {
    method: 'GET',
    path: '/konseria/payments',
    handler: getAllPaymentsHandler,
  },

  {
    method: 'GET',
    path: '/konseria/payments/{paymentId}',
    handler: getPaymentByIdHandler,
  },

  {
    method: 'POST',
    path: '/konseria/payments',
    handler: createPaymentHandler,
  },

  {
    method: 'PUT',
    path: '/konseria/payments/{paymentId}',
    handler: updatePaymentHandler,
  },

  {
    method: 'DELETE',
    path: '/konseria/payments/{paymentId}',
    handler: deletePaymentHandler,
  },
];

module.exports = paymentRoutes;

