const express = require('express');
const app = express();

const routes = require('./src/routes');

app.use(express.json());
app.use('/', routes);

const db = require('./src/config/db');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('Database connected:', res.rows);
  }
});

module.exports = app;