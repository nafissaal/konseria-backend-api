const {
  getAllTicketsHandler,
  getTicketByIdHandler,
  createTicketHandler,
  updateTicketHandler,
  resaleTicketHandler,
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

  {
    method: 'POST',
    path: '/tickets',
    handler: createTicketHandler,
  },

  {
    method: 'PUT',
    path: '/tickets/{ticketId}',
    handler: updateTicketHandler,
  },

  {
    method: 'POST',
    path: '/tickets/{ticketId}/sell',
    handler: resaleTicketHandler,
  },

];

module.exports = ticketRoutes;

