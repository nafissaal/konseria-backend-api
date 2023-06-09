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
    path: '/payments',
    handler: getAllPaymentsHandler,
  },

  {
    method: 'GET',
    path: '/payments/{paymentId}',
    handler: getPaymentByIdHandler,
  },

  {
    method: 'POST',
    path: '/payments',
    handler: createPaymentHandler,
  },

  {
    method: 'PUT',
    path: '/payments/{paymentId}',
    handler: updatePaymentHandler,
  },

  {
    method: 'DELETE',
    path: '/payments/{paymentId}',
    handler: deletePaymentHandler,
  },
];

module.exports = paymentRoutes;

