// src/controllers/productController.js
const ProductModel = require('../models/productModel');

exports.createProduct = async (req, res) => {
    const id = await ProductModel.create(req.body);
    res.status(201).json({ id, ...req.body });
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
    const affectedRows = await ProductModel.update(req.params.id, req.body);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ id: req.params.id, ...req.body });
};

exports.deleteProduct = async (req, res) => {
    const affectedRows = await ProductModel.delete(req.params.id);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
};
