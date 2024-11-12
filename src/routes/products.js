// src/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productSchema, idSchema } = require('../validators/productValidator');
const validate = require('../middleware/validate');
const asyncHandler = require('../middleware/asyncHandler');

// Middleware para validar el 'id' en los parámetros de la ruta
const validateId = (req, res, next) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).json({
            message: 'ID inválido',
            details: error.details,
        });
    }
    next();
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', validate(productSchema), asyncHandler(productController.createProduct));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
router.put('/:id', validateId, validate(productSchema), asyncHandler(productController.updateProduct));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', asyncHandler(productController.getAllProducts));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 */
router.get('/:id', validateId, asyncHandler(productController.getProductById));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', validateId, asyncHandler(productController.deleteProduct));

module.exports = router;
