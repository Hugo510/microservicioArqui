// src/middleware/validate.js
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
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
