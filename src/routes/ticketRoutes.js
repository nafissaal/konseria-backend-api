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
    path: '/konseria/tickets',
    handler: getAllTicketsHandler,
  },

  {
    method: 'GET',
    path: '/konseria/tickets/{ticketId}',
    handler: getTicketByIdHandler,
  },

  {
    method: 'POST',
    path: '/konseria/tickets',
    handler: createTicketHandler,
  },

  {
    method: 'PUT',
    path: '/konseria/tickets/{ticketId}',
    handler: updateTicketHandler,
  },

  {
    method: 'POST',
    path: '/konseria/tickets/{ticketId}/sell',
    handler: resaleTicketHandler,
  },

];

module.exports = ticketRoutes;

