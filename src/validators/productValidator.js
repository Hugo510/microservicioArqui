// src/validators/productValidator.js
const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const productSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().allow('').max(1000), // Puedes agregar un máximo de caracteres si es necesario
    price: Joi.number().precision(2).positive().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().max(255).required(),
});

module.exports = {
    productSchema,
    idSchema,
};
