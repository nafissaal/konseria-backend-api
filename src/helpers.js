const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'DESKTOP-NJ370JU',
  user: 'root@localhost',
  password: 'MS7531^_^ql',
  database: 'konseriadb',
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

// Helper function (mengeksekusi SQL query)
const executeQuery = (connection, query, values) => new Promise((resolve, reject) => {
  connection.query(query, values, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
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

module.exports = {
  getConnectionFromPool,
  executeQuery,
  releaseConnection,
};
