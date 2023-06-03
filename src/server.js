const Hapi = require('@hapi/hapi');
const routes = require('../routes');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'DESKTOP-NJ370JU',
  user: 'root@localhost',
  password: 'MS7531^_^ql',
  database: 'konseriadb',
});

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

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();





