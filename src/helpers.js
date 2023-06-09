const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
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
const executeQuery = (query, values) => new Promise((resolve, reject) => {
  getConnectionFromPool()
    .then((connection) => {
      connection.query(query, values, (error, result) => {
        releaseConnection(connection)
          .then(() => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .catch((releaseError) => {
            reject(releaseError);
          });
      });
    })
    .catch((connectionError) => {
      reject(connectionError);
    });
});



module.exports = {
  getConnectionFromPool,
  releaseConnection,
  executeQuery,
};
