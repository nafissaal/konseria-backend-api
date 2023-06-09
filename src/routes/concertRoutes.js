const {
  getAllConcertsHandler,
  getConcertByIdHandler,
  createConcertHandler,
  updateConcertHandler,
  deleteConcertHandler,
} = require('../handlers/concertHandlers');

const concertRoutes = [
  {
    method: 'GET',
    path: '/concerts',
    handler: getAllConcertsHandler,
  },

  {
    method: 'GET',
    path: '/concerts/{concertId}',
    handler: getConcertByIdHandler,
  },

  {
    method: 'POST',
    path: '/concerts',
    handler: createConcertHandler,
  },

  {
    method: 'PUT',
    path: '/concerts/{concertId}',
    handler: updateConcertHandler,
  },

  {
    method: 'DELETE',
    path: '/concerts/{concertId}',
    handler: deleteConcertHandler,
  },
];

module.exports = concertRoutes;
