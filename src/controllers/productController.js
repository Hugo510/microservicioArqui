// src/controllers/productController.js
const ProductModel = require('../models/productModel');
const path = require('path');

exports.createProduct = async (req, res) => {
    const productData = req.body;

    // Manejar la imagen
    if (req.file) {
        productData.image_url = `/uploads/${req.file.filename}`;
    } else {
        productData.image_url = null; // O establece un valor por defecto
    }

    const id = await ProductModel.create(productData);
    res.status(201).json({ id, ...productData });
};

exports.getAllProducts = async (req, res) => {
    const products = await ProductModel.findAll();
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
};

exports.updateProduct = async (req, res) => {
    const productData = req.body;

    // Manejar la imagen
    if (req.file) {
        productData.image_url = `/uploads/${req.file.filename}`;
    }

    const affectedRows = await ProductModel.update(req.params.id, productData);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ id: req.params.id, ...productData });
};

exports.deleteProduct = async (req, res) => {
    const affectedRows = await ProductModel.delete(req.params.id);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
};
