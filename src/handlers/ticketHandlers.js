const {
  executeQuery,
  getConnectionFromPool,
  releaseConnection,
} = require('../helpers');

// GET /tickets - Memanggil daftar tiket yang tersedia
const getAllTicketsHandler = async (request, h) => {
  try {
    const query = 'SELECT * FROM tickets';
    const tickets = await executeQuery(query);

    return h.response({
      status: 'success',
      data: tickets,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil tiket:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memanggil tiket',
    }).code(500);
  }
};

// GET /tickets/:ticketId - Memanggil tiket tertentu
const getTicketByIdHandler = async (request, h) => {
  try {
    const { ticketId } = request.params;

    const query = 'SELECT * FROM tickets WHERE ticketId = ?';
    const values = [ticketId];

    const [ticket] = await executeQuery(query, values);

    if (!ticket) {
      return h.response({
        status: 'fail',
        message: 'Ticket tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: ticket,
    }).code(200);
  } catch (error) {
    console.error('Error saat memanggil tiket:', error);
    return h.response({
      status: 'error',
      message: 'Gagal memanggil tiket',
    }).code(500);
  }
};

// POST/tickets - Membuat tiket baru
const createTicketHandler = async (request, h) => {
  try {
    const {
      eventId, sellerId, price, quantity,
    } = request.payload;

    const query = 'INSERT INTO tickets (eventId, sellerId, price, quantity) VALUES (?, ?, ?, ?)';
    const values = [eventId, sellerId, price, quantity];

    const connection = await getConnectionFromPool();
    const result = await executeQuery(connection, query, values);

    await releaseConnection(connection);

    const newTicketId = result.insertId;

    return h.response({
      status: 'success',
      message: 'Ticket telah dibuat',
      data: { ticketId: newTicketId },
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
  try {
    const { ticketId } = request.params;
    const {
      eventId, sellerId, price, quantity,
    } = request.payload;

    const query = 'UPDATE tickets SET eventId = ?, sellerId = ?, price = ?, quantity = ? WHERE ticketId = ?';
    const values = [eventId, sellerId, price, quantity, ticketId];

    const connection = await getConnectionFromPool();
    const result = await executeQuery(connection, query, values);

    await releaseConnection(connection);

    if (result.affectedRows === 0) {
      return h.response({
        status: 'fail',
        message: 'Ticket tidak ditemukan',
      }).code(404);
    }

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

// POST /tickets/:ticketId/sell - Resale ticket (trading)
const resaleTicketHandler = async (request, h) => {
  try {
    const { ticketId } = request.params;
    const { sellerId, buyerId } = request.payload;

    const query = 'INSERT INTO ResaleTickets (ticketId, sellerId, buyerId) VALUES (?, ?, ?)';
    const values = [ticketId, sellerId, buyerId];

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
      message: 'Gagal membuat tiket trading',
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
