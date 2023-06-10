const {
  getAllHistoriesHandler,
  getHistoryByIdHandler,
} = require('../handlers/historyHandlers');

const historyRoutes = [
  {
    method: 'GET',
    path: '/konseria/histories',
    handler: getAllHistoriesHandler,
  },

  {
    method: 'GET',
    path: '/konseria/histories/{historyId}',
    handler: getHistoryByIdHandler,
  },

];

module.exports = historyRoutes;
