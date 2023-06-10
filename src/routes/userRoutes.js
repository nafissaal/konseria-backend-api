const {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  getSellerTicketsHandler,
  getBuyerTicketsHandler,
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
    method: 'GET',
    path: '/users',
    handler: getAllUsersHandler,
  },

  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserByIdHandler,
  },

  {
    method: 'GET',
    path: '/users/{userId}/tickets/seller',
    handler: getSellerTicketsHandler,
  },

  {
    method: 'GET',
    path: '/users/{userId}/tickets/buyer',
    handler: getBuyerTicketsHandler,
  },

  {
    method: 'GET',
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
