// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'El archivo es demasiado grande. El tamaño máximo es de 5MB.',
        });
    }

    if (err.message === 'Tipo de archivo no soportado') {
        return res.status(400).json({
            message: 'Tipo de archivo no soportado. Solo se permiten imágenes en formato jpeg, jpg, png y gif.',
        });
    }
};

module.exports = errorHandler;
