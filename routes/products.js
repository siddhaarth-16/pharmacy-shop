const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get All Products
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM products WHERE stock > 0');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Search Products
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ?',
      [`%${q}%`, `%${q}%`, `%${q}%`]
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
});

module.exports = router;
