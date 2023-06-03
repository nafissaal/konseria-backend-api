const {
  getConnectionFromPool,
  executeQuery,
  releaseConnection,
} = require('../helpers');

// POST /users - Membuat akun pengguna baru
const createUserHandler = async (request, h) => {
  try {
    const {
      username, name, email, password, noHP, profileURL,
    } = request.payload;

    const query = 'INSERT INTO User (username, name, email, password, noHP, profileURL, status) VALUES (?, ?, ?, ?, ?, ?, \'active\')';

    const values = [username, name, email, password, noHP, profileURL];

    const connection = await getConnectionFromPool();
    const result = await executeQuery(connection, query, values);
    const userID = result.insertId;

    await releaseConnection(connection);

    return h.response({
      status: 'success',
      message: 'User telah dibuat',
      data: {
        userID,
      },
    }).code(201);
  } catch (error) {
    console.error('Error saat membuat user:', error);
    return h.response({
      status: 'error',
      message: 'Gagal membuat user',
    }).code(500);
  }
};

// POST /login - Login user
const loginUserHandler = async (request, h) => {
  try {
    const { username, password } = request.payload;

    const query = 'SELECT * FROM User WHERE username = ? AND password = ?';

    const values = [username, password];

    const connection = await getConnectionFromPool();
    const [user] = await executeQuery(connection, query, values);

    await releaseConnection(connection);

    if (user) {
      return h.response({
        status: 'success',
        message: 'Login berhasil',
        data: user[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Username atau password salah',
    }).code(401);
  } catch (error) {
    console.error('Error saat login:', error);
    return h.response({
      status: 'error',
      message: 'Gagal login',
    }).code(500);
  }
};

// GET/users - Memanggil semua pengguna
const getAllUsersHandler = async (request, h) => {
  const query = 'SELECT * FROM user';

  try {
    const user = await executeQuery(query);
    return h.response({
      status: 'success',
      data: user,
    }).code(200);
  } catch (err) {
    console.error('Error saat memanggil user:', err);
    return h.response({
      status: 'error',
      message: 'Error saat memanggil user',
    }).code(500);
  }
};

// GET /users/{userID} - Memanggil profil pengguna tertentu
const getUserByIdHandler = async (request, h) => {
  const { userID } = request.params;
  const query = 'SELECT * FROM users WHERE userID = ?';
  const values = [userID];

  try {
    const user = await executeQuery(query, values);
    if (user.length > 0) {
      return h.response({
        status: 'success',
        data: user[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'User tidak ditemukan',
    }).code(404);
  } catch (err) {
    console.error('Error saat memanggil user:', err);
    return h.response({
      status: 'error',
      massage: 'Gagal memanggil user',
    }).code(500);
  }
};

// PUT /users/{userID} - Mengupdate profil pengguna tertentu
const updateUserHandler = async (request, h) => {
  try {
    const { userID } = request.params;

    const {
      username, name, email, password, noHP, profileURL,
    } = request.payload;

    const query = `UPDATE User SET username = ?, name = ?, email = ?, password = ?, 
    noHP = ?, profileURL = ? WHERE userID = ?`;

    const values = [username, name, email, password, noHP, profileURL, userID];

    const connection = await getConnectionFromPool();
    await executeQuery(connection, query, values);

    await releaseConnection(connection);

    return h.response({
      status: 'success',
      message: 'Data user telah diupdate',
    }).code(200);
  } catch (error) {
    console.error('Error saat mengupdate user:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengupdate user',
    }).code(500);
  }
};

// DELETE /users/{userID} - Menonaktifkan user dengan userID
const deleteUserHandler = async (request, h) => {
  try {
    const { userID } = request.params;

    const query = 'UPDATE User SET status = ? WHERE userID = ?';
    const values = ['inactive', userID];

    const connection = await getConnectionFromPool();
    await executeQuery(connection, query, values);

    await releaseConnection(connection);

    return h.response({
      status: 'success',
      message: 'User telah di non-aktifkan',
    }).code(200);
  } catch (error) {
    console.error('Error saat menghapus user:', error);
    return h.response({
      status: 'error',
      message: 'Gagal menon-aktifkan user',
    }).code(500);
  }
};

module.exports = {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
};
