const { rootHandler } = require('../handlers/rootHandlers');

const rootRoutes = [
  {
    method: 'GET',
    path: '/konseria',
    handler: rootHandler,
  },
];

module.exports = rootRoutes;
