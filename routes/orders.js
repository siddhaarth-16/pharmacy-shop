const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Create Order
router.post('/', async (req, res) => {
  try {
    const { user_id, items, total_amount } = req.body;
    
    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert order
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
        [user_id, total_amount]
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );
      }

      // Clear cart
      await connection.execute('DELETE FROM cart WHERE user_id = ?', [user_id]);

      await connection.commit();
      connection.release();

      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get User Orders
router.get('/user/:user_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.user_id]
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

module.exports = router;
