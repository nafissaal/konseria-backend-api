const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: '34.101.149.199',
//   user: 'konseria-admin',
//   password: 'kOnSeRiA', //ganti password yg terakhir
//   database: 'konseriadb',
//   socketPath: '/cloudsql/konseria-389710:asia-southeast2:konseriadb',
// });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'konseriadb'
});

// Helper function (memanggil koneksi dari connection pool)
const getConnectionFromPool = () => new Promise((resolve, reject) => {
  pool.getConnection((error, connection) => {
    if (error) {
      reject(error);
    } else {
      resolve(connection);
    }
  });
});

// Helper function (mengembalikan koneksi kembali ke connection pool)
const releaseConnection = (connection) => new Promise((resolve, reject) => {
  connection.release((error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

// Helper function (mengeksekusi SQL query)
// const executeQuery = (connection, query, values) => new Promise((resolve, reject) => {
//   connection.query(query, values, (error, result) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(result);
//     }
//   });
// });
const executeQuery = (query, values) => new Promise(async (resolve, reject) => {
  let connection = await getConnectionFromPool();//perubahan supaya get connection gausah ganti satu satu
  connection.query(query, values, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

module.exports = {
  getConnectionFromPool,
  releaseConnection,
  executeQuery,
};
