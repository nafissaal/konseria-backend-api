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
const createTicketHandler = async (request, h) => {
  const {
    concertId, type, price, quantity, availableQuantity,
  } = request.payload;
  const query = 'INSERT INTO Tickets (concertId, type, price, quantity, availableQuantity) VALUES (?, ?, ?, ?, ?)';
  const values = [concertId, type, price, quantity, availableQuantity];

  try {
    const result = await executeQuery(query, values);
    const createdTicketId = result.insertId;
    return h.response({
      status: 'success',
      message: 'Tiket telah dibuat',
      data: {
        ticketId: createdTicketId,
      },
    }).code(201);
  } catch (error) {
    console.error('Error saat membuat tiket:', error);
    return h.response({
      status: 'error',
      message: 'Gagal membuat tiket',
    }).code(500);
  }
};

// PUT /tickets/{ticketID} - Update a specific ticket by ticketID
const updateTicketHandler = async (request, h) => {
  const { ticketId } = request.params;
  const {
    concertId, type, price, quantity, availableQuantity,
  } = request.payload;
  const query = 'UPDATE Tickets SET concertId = ?, type = ?, price = ?, quantity = ?, availableQuantity = ? WHERE ticketId = ?';
  const values = [concertId, type, price, quantity, availableQuantity, ticketId];

  try {
    await executeQuery(query, values);
    return h.response({
      status: 'success',
      message: 'Ticket telah diupdate',
    }).code(200);
  } catch (error) {
    console.error('Error saat mengupdate tiket:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengupdate tiket',
    }).code(500);
  }
};

// POST /tickets/:ticketId/sell - Resale ticket that already bought
const resaleTicketHandler = async (request, h) => {
  const { ticketId } = request.params;
  const { sellerId, buyerId } = request.payload;
  const query = 'INSERT INTO ResaleTickets (ticketId, sellerId, buyerId) VALUES (?, ?, ?)';
  const values = [ticketId, sellerId, buyerId];

  try {
    const result = await executeQuery(query, values);
    const createdResaleTicketId = result.insertId;
    return h.response({
      status: 'success',
      message: 'Tiket trading telah dibuat',
      data: {
        resaleTicketId: createdResaleTicketId,
      },
    }).code(201);
  } catch (error) {
    console.error('Error saat membuat tiket trading:', error);
    return h.response({
      status: 'error',
      message: 'gagal membuat tiket trading',
    }).code(500);
  }
};

module.exports = {
  getAllTicketsHandler,
  getTicketByIdHandler,
  createTicketHandler,
  updateTicketHandler,
  resaleTicketHandler,
};
