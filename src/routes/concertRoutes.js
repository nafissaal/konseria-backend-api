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
    path: '/konseria/concerts',
    handler: getAllConcertsHandler,
  },

  {
    method: 'GET',
    path: '/konseria/concerts/{concertId}',
    handler: getConcertByIdHandler,
  },

  {
    method: 'POST',
    path: '/konseria/concerts',
    handler: createConcertHandler,
  },

  {
    method: 'PUT',
    path: '/konseria/concerts/{concertId}',
    handler: updateConcertHandler,
  },

  {
    method: 'DELETE',
    path: '/konseria/concerts/{concertId}',
    handler: deleteConcertHandler,
  },
];

module.exports = concertRoutes;
