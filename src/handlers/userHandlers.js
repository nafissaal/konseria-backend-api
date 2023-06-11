const crypto = require('crypto');
const {
  getConnectionFromPool,
  releaseConnection,
  executeQuery,
} = require('../helpers');


// POST /users - Membuat akun pengguna baru
const createUserHandler = async (request, h) => {
  try {
    const {
      name,
      email,
      username,
      password,
      noHP,
      profileURL,
      genrePreference,
      artistPreference,
      venuePreference,
      cityPreference,
    } = request.payload;

    // Hash password SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const query = 'INSERT INTO Users (name, email, username, password, noHP, profileURL, status, genrePreference, artistPreference, venuePreference, cityPreference) VALUES (?, ?, ?, ?, ?, ?, \'active\', ?, ?, ?, ?)';
    const values = [
      name,
      email,
      username,
      hashedPassword,
      noHP,
      profileURL,
      genrePreference,
      artistPreference,
      venuePreference,
      cityPreference,
    ];

    const connection = await getConnectionFromPool();
    const result = await executeQuery(connection, query, values);
    const userId = result.insertId;

    await releaseConnection(connection);

    return h.response({
      status: 'success',
      message: 'User telah dibuat',
      data: {
        userId,
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

    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';

    const values = [username, password];

    const connection = await getConnectionFromPool();
    const [users] = await executeQuery(connection, query, values);

    await releaseConnection(connection);

    if (users) {
      return h.response({
        status: 'success',
        message: 'Login berhasil',
        data: users,
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
  const query = 'SELECT * FROM Users';

  try {
    const users = await executeQuery(query);
    return h.response({
      status: 'success',
      data: users,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil user:', error);
    return h.response({
      status: 'error',
      message: 'Error saat memanggil user',
    }).code(500);
  }
};

// GET /users/{userId} - Memanggil profil pengguna tertentu
const getUserByIdHandler = async (request, h) => {
  try {
    const { userId } = request.params;
    const query = 'SELECT * FROM Users WHERE userId = ?';
    const values = [userId];

    const result = await executeQuery(query, values);
    const user = result[0];

    if (user) {
      return h.response({
        status: 'success',
        data: user,
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'User tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat memanggil user:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memanggil user',
    }).code(500);
  }
};

// GET /users/{userId}/tickets/seller - Memanggil seller
const getSellerTicketsHandler = async (request, h) => {
  try {
    const { userId } = request.params;
    const query = 'SELECT * FROM Tickets WHERE sellerId = ?';
    const values = [userId];

    const result = await executeQuery(query, values);
    const tickets = result;

    return h.response({
      status: 'success',
      data: tickets,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil penjual:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memanggil penjual',
    }).code(500);
  }
};

// GET /users/{userId}/tickets/buyer - Memanggil buyer
const getBuyerTicketsHandler = async (request, h) => {
  try {
    const { userId } = request.params;
    const query = 'SELECT * FROM Tickets WHERE buyerId = ?';
    const values = [userId];

    const result = await executeQuery(query, values);
    const tickets = result;

    return h.response({
      status: 'success',
      data: tickets,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil pembeli:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memanggil pembeli',
    }).code(500);
  }
};

// PUT /users/{userId} - Mengupdate profil pengguna tertentu
const updateUserHandler = async (request, h) => {
  try {
    const { userId } = request.params;

    const {
      name,
      email,
      username,
      noHP,
      profileURL,
      genrePreference,
      artistPreference,
      venuePreference,
      cityPreference,
    } = request.payload;

    const query = 'UPDATE Users SET name = ?, email = ?, username = ?, noHP = ?, profileURL = ?, genrePreference = ?, artistPreference = ?, venuePreference = ?, cityPreference = ? WHERE userId = ?';
    const values = [
      name,
      email,
      username,
      noHP,
      profileURL,
      genrePreference,
      artistPreference,
      venuePreference,
      cityPreference,
      userId,
    ];


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
    const { userId } = request.params;

    const query = 'UPDATE Users SET status = ? WHERE userId = ?';
    const values = ['inactive', userId];

    const connection = await getConnectionFromPool();
    await executeQuery(connection, query, values);

    await releaseConnection(connection);

    return h.response({
      status: 'success',
      message: 'User telah di non-aktifkan',
    }).code(200);
  } catch (error) {
    console.error('Error saat menon-aktifkan user:', error);
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
  getSellerTicketsHandler,
  getBuyerTicketsHandler,
  updateUserHandler,
  deleteUserHandler,
};
