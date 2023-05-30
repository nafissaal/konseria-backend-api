const { nanoid } = require('nanoid');
const concerts = require('../data/concerts');

// GET /concerts - Memanggil daftar konser
const getAllConcertsHandler = () => ({
  status: 'success',
  data: {
    concerts,
  },
});

// GET /concerts/:concertId - Memanggil konser tertentu
const getConcertByIdHandler = (request, h) => {
  const { concertID } = request.params;

  const concert = concerts.filter((c) => c.id === concertID)[0];

  if (concert) {
    const response = h
      .response({
        status: 'success',
        data: {
          concert,
        },
      });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Konser tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  getAllConcertsHandler,
  getConcertByIdHandler,
};
