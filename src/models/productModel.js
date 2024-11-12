// src/models/productModel.js
const db = require('../config/db');

class ProductModel {
    static async create(product) {
        try {
            const [result] = await db.execute(
                'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                [product.name, product.description, product.price, product.stock, product.category, product.image_url]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el producto:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.execute('SELECT * FROM products');
            return rows;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            throw error;
        }
    }

    static async update(id, product) {
        try {
            const [result] = await db.execute(
                'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
                [product.name, product.description, product.price, product.stock, product.category, product.image_url, id]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw error;
        }
    }
}

module.exports = ProductModel;
