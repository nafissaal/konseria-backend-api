const {
  getAllHistoriesHandler,
  getHistoryByIdHandler,
} = require('../handlers/historyHandlers');

const historyRoutes = [
  {
    method: 'GET',
    path: '/histories',
    handler: getAllHistoriesHandler,
  },

  {
    method: 'GET',
    path: '/histories/{historyId}',
    handler: getHistoryByIdHandler,
  },

];

module.exports = historyRoutes;
