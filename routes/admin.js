const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Add Product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock, category, manufacturer, expiry_date, image_url } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO products (name, description, price, stock, category, manufacturer, expiry_date, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category, manufacturer, expiry_date, image_url]
    );
    connection.release();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Update Product
router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, stock, category, manufacturer, expiry_date, image_url } = req.body;
    
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE products SET name=?, description=?, price=?, stock=?, category=?, manufacturer=?, expiry_date=?, image_url=? WHERE id=?',
      [name, description, price, stock, category, manufacturer, expiry_date, image_url, req.params.id]
    );
    connection.release();

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete Product
router.delete('/products/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Get All Orders
router.get('/orders', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM orders ORDER BY created_at DESC');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Update Order Status
router.put('/orders/:id', async (req, res) => {
  try {\n    const { status } = req.body;
    const connection = await pool.getConnection();
    await connection.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    connection.release();

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

module.exports = router;
