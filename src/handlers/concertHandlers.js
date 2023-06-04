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

module.exports = {
  getAllConcertsHandler,
  getConcertByIdHandler,
};
