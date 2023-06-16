const Hapi = require('@hapi/hapi');

const concertRoutes = require('./routes/concertRoutes');
const historyRoutes = require('./routes/historyRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rootRoutes = require('./routes/rootRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route([
    ...concertRoutes,
    ...historyRoutes,
    ...orderRoutes,
    ...paymentRoutes,
    ...rootRoutes,
    ...ticketRoutes,
    ...userRoutes,
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

try {
  init();
} catch (error) {
  console.error('Error occurred while starting the server:', error);
}
