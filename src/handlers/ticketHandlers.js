const { nanoid } = require('nanoid');
const tickets = require('../data/tickets');

// GET /tickets - Memanggil daftar tiket yang tersedia
const getAllTicketsHandler = () => ({
  status: 'success',
  data: {
    tickets,
  },
});

// GET /tickets/:ticketId - Memanggil tiket tertentu
const getTicketByIdHandler = (request, h) => {
  const { ticketID } = request.params;

  const ticket = tickets.filter((t) => t.id === ticketID)[0];

  if (ticket) {
    const response = h
      .response({
        status: 'success',
        data: {
          ticket,
        },
      });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Tiket tidak ditemukan',
  });
  response.code(404);
  return response;
};

// POST/tickets - Membuat tiket baru
const addTicketHandler = (request, h) => {

};

// POST /tickets/:ticketId/sell - Menjual tiket trading
const addTicketTradingHandler = (request, h) => {

};

module.exports = {
  getAllTicketsHandler,
  getTicketByIdHandler,
  addTicketHandler,
  addTicketTradingHandler,
};
