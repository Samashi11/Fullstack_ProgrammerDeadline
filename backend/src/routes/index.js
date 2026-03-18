const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Working');
});

module.exports = router;

const db = require('../config/db');

router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});