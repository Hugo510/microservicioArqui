// src/middleware/validate.js
const validate = (schema) => {
    return (req, res, next) => {
        // Si multer ha procesado un formulario multipart/form-data, los datos estarán en req.body
        const data = req.body;

        // Convertir campos numéricos que vienen como strings
        if (data.price) data.price = parseFloat(data.price);
        if (data.stock) data.stock = parseInt(data.stock, 10);

        const { error } = schema.validate(data);
        if (error) {
            return res.status(400).json({
                message: 'Datos inválidos',
                details: error.details,
            });
        }
        next();
    };
};

module.exports = validate;
