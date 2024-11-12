// src/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoutes = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Es recomendable especificar la versión de OpenAPI
        info: {
            title: 'API de Gestión de Productos',
            version: '1.0.0',
            description: 'Microservicio para gestionar productos en una aplicación de e-commerce',
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/products', productRoutes);

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Middleware de manejo de errores (después de las rutas)
app.use(errorHandler);

// Probar la conexión a la base de datos antes de iniciar el servidor
db.getConnection()
    .then((connection) => {
        console.log('Conexión a la base de datos establecida exitosamente');
        connection.release();

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
    });
