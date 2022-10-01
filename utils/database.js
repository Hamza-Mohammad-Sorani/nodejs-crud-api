var mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_crud',
    password: '',
});

pool.getConnection((err, connection) => {
    if (err)
        throw err;
    connection.release();
});

module.exports = pool.promise();