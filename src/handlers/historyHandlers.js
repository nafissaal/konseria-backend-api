const { nanoid } = require('nanoid');
const histories = require('../data/histories');

// GET /history - Memanggil semua riwayat order
const getAllHistoriesHandler = () => ({
  status: 'success',
  data: {
    histories,
  },
});

// GET/history/:historyID - Memanggil riwayat order tertentu
const getHistoryByIdHandler = (request, h) => {
  const { historyID } = request.params;

  const history = histories.filter((his) => his.id === historyID)[0];

  if (history) {
    const response = h
      .response({
        status: 'success',
        data: {
          history,
        },
      });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Riwayat tidak ditemukan',
  });
  response.code(404);
  return response;
};

// PUT/history/:historyID - Mengupdate riwayat order tertentu

module.exports = {
  getAllHistoriesHandler,
  getHistoryByIdHandler,
};
