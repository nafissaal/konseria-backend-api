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
    path: '/histories/{historyID}',
    handler: getHistoryByIdHandler,
  },

];

module.exports = historyRoutes;



