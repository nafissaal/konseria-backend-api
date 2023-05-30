const {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} = require('../handlers/userHandlers');

const userRoutes = [
  {
    method: 'POST',
    path: '/users',
    handler: addUserHandler,
  },

  {
    method: 'POST',
    path: '/users',
    handler: getAllUsersHandler,
  },

  {
    method: 'POST',
    path: '/users/{userID}',
    handler: getUserByIdHandler,
  },

  {
    method: 'POST',
    path: '/users',
    handler: updateUserHandler,
  },

];

module.exports = userRoutes;
