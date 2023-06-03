const {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('../handlers/userHandlers');

const userRoutes = [
  {
    method: 'POST',
    path: '/users',
    handler: createUserHandler,
  },

  {
    method: 'POST',
    path: '/login',
    handler: loginUserHandler,
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

  {
    method: 'DELETE',
    path: '/users/{userID}',
    handler: deleteUserHandler,
  },

];

module.exports = userRoutes;
