const {
  executeQuery,
} = require('../helpers');

// GET /tickets - Memanggil daftar tiket yang tersedia
const getAllTicketsHandler = async (request, h) => {
  const query = 'SELECT * FROM tickets';

  try {
    const tickets = await executeQuery(query);
    return h.response({
      status: 'success',
      data: tickets,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil tiket:', error);
    return h.response({
      status: 'error',
      message: 'Error saat memanggil tiket',
    }).code(500);
  }
};

// GET /tickets/:ticketId - Memanggil tiket tertentu
const getTicketByIdHandler = async (request, h) => {
  const { ticketId } = request.params;
  const query = 'SELECT * FROM tickets WHERE ticketId = ?';
  const values = [ticketId];

  try {
    const tickets = await executeQuery(query, values);
    if (tickets.length > 0) {
      return h.response({
        status: 'success',
        data: tickets[0],
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Tiket tidak ditemukan',
    }).code(404);
  } catch (error) {
    console.error('Error saat memanggil tiket:', error);
    return h.response({
      status: 'error',
      massage: 'Gagal memanggil tiket',
    }).code(500);
  }
};

// POST/tickets - Membuat tiket baru


// POST /tickets/:ticketId/sell - Menjual tiket trading


module.exports = {
  getAllTicketsHandler,
  getTicketByIdHandler,
};
