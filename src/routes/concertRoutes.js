const {
  getAllConcertsHandler,
  getConcertByIdHandler,
} = require('../handlers/concertHandlers');

const concertRoutes = [
  {
    method: 'GET',
    path: '/concerts',
    handler: getAllConcertsHandler,
  },

  {
    method: 'GET',
    path: '/concerts/{ticketID}',
    handler: getConcertByIdHandler,
  },

];

module.exports = concertRoutes;


