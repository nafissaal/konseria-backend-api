const { nanoid } = require('nanoid');
const users = require('../data/users');

// POST /users - Membuat akun pengguna baru

// GET/users - Memanggil semua pengguna
const getAllUsersHandler = () => ({
  status: 'success',
  data: {
    users,
  },
});

// GET /users/:userId - Memanggil profil pengguna tertentu
const getUserByIdHandler = (request, h) => {
  const { userID } = request.params;

  const user = users.filter((u) => u.id === userID)[0];

  if (user) {
    const response = h
      .response({
        status: 'success',
        data: {
          user,
        },
      });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'User tidak ditemukan',
  });
  response.code(404);
  return response;
};

// PUT /users/:userId - Mengupdate profil pengguna tertentu
const updateUserHandler = (request, h) => {

};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
};
