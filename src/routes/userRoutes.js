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
    path: '/konseria/users',
    handler: createUserHandler,
  },

  {
    method: 'POST',
    path: '/konseria/login',
    handler: loginUserHandler,
  },

  {
    method: 'GET',
    path: '/konseria/users',
    handler: getAllUsersHandler,
  },

  {
    method: 'GET',
    path: '/konseria/users/{userId}',
    handler: getUserByIdHandler,
  },

  {
    method: 'GET',
    path: '/konseria/users/{userId}/tickets/seller',
    handler: getSellerTicketsHandler,
  },

  {
    method: 'GET',
    path: '/konseria/users/{userId}/tickets/buyer',
    handler: getBuyerTicketsHandler,
  },

  {
    method: 'GET',
    path: '/konseria/users',
    handler: updateUserHandler,
  },

  {
    method: 'DELETE',
    path: '/konseria/users/{userID}',
    handler: deleteUserHandler,
  },

];

module.exports = userRoutes;
