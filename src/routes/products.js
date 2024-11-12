// src/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productSchema, idSchema } = require('../validators/productValidator');
const validate = require('../middleware/validate');
const asyncHandler = require('../middleware/asyncHandler');
const upload = require('../config/multer');

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
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 * 
 */
router.post('/', upload.single('image'), validate(productSchema), asyncHandler(productController.createProduct));

/**
 * @swagger
  * /products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen del producto
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateId, upload.single('image'), validate(productSchema), asyncHandler(productController.updateProduct));

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
