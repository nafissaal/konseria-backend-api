const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
<<<<<<< HEAD
  host: '34.128.107.144',
  user: 'konseria-admin',
  password: 'konseria-admin',
  database: 'konseriadb',
  socketPath: '/cloudsql/konseria:asia-southeast2:konseriadb-instance',
=======
  // host: '34.101.149.199',
  user: 'konseria-admin',
  password: 'konseria-admin', //ganti password yg terakhir
  database: 'konseriadb',
  socketPath: '/cloudsql/konseria-389710:asia-southeast2:konseriadb',
>>>>>>> f5fc4ad53798d41de87b98652e7256cf553234f5
  connectTimeout: 10000, // 10 seconds
  waitForConnections: true, // Default: true
  queueLimit: 0, // Default: 0
});
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'konseriadb'
// });

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
<<<<<<< HEAD
const executeQuery = (query, values) => new Promise(async (resolve, reject) => {
  try {
    let connection = await getConnectionFromPool();
=======
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
  try {
    let connection = await getConnectionFromPool();//perubahan supaya get connection gausah ganti satu satu
>>>>>>> f5fc4ad53798d41de87b98652e7256cf553234f5
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  } catch (error) {
    console.log(error);
    reject(error)
  }
});

module.exports = {
  getConnectionFromPool,
  releaseConnection,
  executeQuery,
};
