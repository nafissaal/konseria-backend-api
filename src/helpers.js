const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'DESKTOP-NJ370JU',
  user: 'root@localhost',
  password: 'MS7531^_^ql',
  database: 'konseriadb',
});

// Helper function (memanggil koneksi dari connection pool)
const getConnectionFromPool = () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      reject(err);
    } else {
      resolve(connection);
    }
  });
});

// Helper function (mengeksekusi SQL query)
const executeQuery = (connection, query, values) => new Promise((resolve, reject) => {
  connection.query(query, values, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// Helper function (mengembalikan koneksi kembali ke connection pool)
const releaseConnection = (connection) => new Promise((resolve, reject) => {
  connection.release((err) => {
    if (err) {
      reject(err);
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
