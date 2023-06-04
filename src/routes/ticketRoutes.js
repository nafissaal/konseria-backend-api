const {
  getAllTicketsHandler,
  getTicketByIdHandler,
} = require('../handlers/ticketHandlers');

const ticketRoutes = [
  {
    method: 'GET',
    path: '/tickets',
    handler: getAllTicketsHandler,
  },

  {
    method: 'GET',
    path: '/tickets/{ticketId}',
    handler: getTicketByIdHandler,
  },

];

module.exports = ticketRoutes;

