const {
  executeQuery,
} = require('../helpers');

// GET /histories - Memanggil semua riwayat order
const getAllHistoriesHandler = async (request, h) => {
  const query = 'SELECT * FROM histories';

  try {
    const histories = await executeQuery(query);
    return h.response({
      status: 'success',
      data: histories,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil riwayat:', error);
    return h.response({
      status: 'error',
      message: 'Error saat memanggil riwayat',
    }).code(500);
  }
};

// GET/histories/:historyId - Memanggil riwayat order tertentu
const getHistoryByIdHandler = async (request, h) => {
  const { historyId } = request.params;
  const query = 'SELECT * FROM histories WHERE historyId = ?';
  const values = [historyId];

  try {
    const histories = await executeQuery(query, values);
    if (histories.length > 0) {
      return h.response({
        status: 'success',
        data: histories[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Riwayat tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat memanggil riwayat:', error);
    return h.response({
      status: 'error',
      massage: 'Gagal memanggil riwayat',
    }).code(500);
  }
};

// PUT/histories/:historyId - Mengupdate riwayat order tertentu

module.exports = {
  getAllHistoriesHandler,
  getHistoryByIdHandler,
};
