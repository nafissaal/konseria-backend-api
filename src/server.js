const Hapi = require('@hapi/hapi');

const concertRoutes = require('./routes/concertRoutes');
const historyRoutes = require('./routes/historyRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(concertRoutes, historyRoutes, orderRoutes, paymentRoutes, ticketRoutes, userRoutes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();





