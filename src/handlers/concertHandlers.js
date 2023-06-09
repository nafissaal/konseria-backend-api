const {
  executeQuery,
} = require('../helpers');

// GET /concerts - Memanggil daftar konser
const getAllConcertsHandler = async (request, h) => {
  const query = 'SELECT * FROM concerts';

  try {
    const concerts = await executeQuery(query);
    return h.response({
      status: 'success',
      data: concerts,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil konser:', error);
    return h.response({
      status: 'error',
      message: 'Error saat memanggil konser',
    }).code(500);
  }
};

// GET /concerts/:concertId - Memanggil konser tertentu
const getConcertByIdHandler = async (request, h) => {
  const { concertId } = request.params;
  const query = 'SELECT * FROM concerts WHERE concertId = ?';
  const values = [concertId];

  try {
    const concerts = await executeQuery(query, values);
    if (concerts.length > 0) {
      return h.response({
        status: 'success',
        data: concerts[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Konser tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat memanggil konser:', error);
    return h.response({
      status: 'error',
      massage: 'Gagal memanggil konser',
    }).code(500);
  }
};

// POST /concerts - Create a new concert
const createConcertHandler = async (request, h) => {
  const {
    name,
    description,
    company,
    date,
    time,
    genre,
    venue,
    city,
    imageURL,
    venueURL,
    longitude,
    latitude,
    type,
    rate,
  } = request.payload;

  const query = 'INSERT INTO concerts (name, description, company, date, time, genre, venue, city, imageURL, venueURL, longitude, latitude, type, rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [
    name,
    description,
    company,
    date,
    time,
    genre,
    venue,
    city,
    imageURL,
    venueURL,
    longitude,
    latitude,
    type,
    rate,
  ];

  try {
    await executeQuery(query, values);
    return h.response({
      status: 'success',
      message: 'Konser telah dibuat',
    }).code(201);
  } catch (error) {
    console.error('Error saat membuat konser:', error);
    return h.response({
      status: 'error',
      message: 'Gagal membuat konser',
    }).code(500);
  }
};

// PUT /concerts/{concertID} - Update a specific concert by concertID
const updateConcertHandler = async (request, h) => {
  const { concertId } = request.params;
  const {
    name,
    description,
    company,
    date,
    time,
    genre,
    venue,
    city,
    imageURL,
    venueURL,
    longitude,
    latitude,
    type,
    rate,
  } = request.payload;

  const query = 'UPDATE concerts SET name = ?, description = ?, company = ?, date = ?, time = ?, genre = ?, venue = ?, city = ?, imageURL = ?, venueURL = ?, longitude = ?, latitude = ?, type = ?, rate = ? WHERE concertId = ?';

  const values = [
    name,
    description,
    company,
    date,
    time,
    genre,
    venue,
    city,
    imageURL,
    venueURL,
    longitude,
    latitude,
    type,
    rate,
    concertId,
  ];

  try {
    const result = await executeQuery(query, values);
    if (result.affectedRows > 0) {
      return h.response({
        status: 'success',
        message: 'Konser telah diupdate',
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Konser tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat mengupdate konser:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengupdate konser',
    }).code(500);
  }
};

// DELETE /concerts/{concertID} - Delete a specific concert by concertID
const deleteConcertHandler = async (request, h) => {
  const { concertId } = request.params;
  const query = 'DELETE FROM concerts WHERE concertId = ?';
  const values = [concertId];

  try {
    const result = await executeQuery(query, values);
    if (result.affectedRows > 0) {
      return h.response({
        status: 'success',
        message: 'Konser telah dihapus',
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Konser tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat menghapus konser:', error);
    return h.response({
      status: 'error',
      message: 'Gagal menghapus konser',
    }).code(500);
  }
};

module.exports = {
  getAllConcertsHandler,
  getConcertByIdHandler,
  createConcertHandler,
  updateConcertHandler,
  deleteConcertHandler,
};
