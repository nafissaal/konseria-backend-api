const {
  getAllTicketsHandler,
  getTicketByIdHandler,
  addTicketHandler,
  addTicketTradingHandler,
} = require('../handlers/ticketHandlers');

const ticketRoutes = [
  {
    method: 'GET',
    path: '/tickets',
    handler: getAllTicketsHandler,
  },

  {
    method: 'GET',
    path: '/tickets/{ticketID}',
    handler: getTicketByIdHandler,
  },

  {
    method: 'POST',
    path: '/tickets',
    handler: addTicketHandler,
  },

  {
    method: 'POST',
    path: '/tickets/{ticketID}/sell',
    handler: addTicketTradingHandler,
  },

];

module.exports = ticketRoutes;

