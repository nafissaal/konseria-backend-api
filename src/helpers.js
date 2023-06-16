const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '34.128.107.144',
  user: 'konseria-admin',
  password: 'konseria-admin',
  database: 'konseriadb',
  socketPath: '/cloudsql/konseria:asia-southeast2:konseriadb-instance',
  connectTimeout: 10000, // 10 seconds
  waitForConnections: true, // Default: true
  queueLimit: 0, // Default: 0
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
const executeQuery = (query, values) => new Promise(async (resolve, reject) => {
  try {
    let connection = await getConnectionFromPool();
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
