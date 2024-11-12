// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0, // Número máximo de solicitudes en cola (0 es ilimitado)
});

pool.getConnection()
    .then((connection) => {
        console.log('Conexión a la base de datos establecida exitosamente');
        connection.release();
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = pool;
