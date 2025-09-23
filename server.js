// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'iuliacarla',         // e.g. 'postgres'
  host: 'localhost',         // or your cloud DB host
  database: 'pickup_app',    // your database name
  password: 'your_password', // your DB password
  port: 5432                 // default PostgreSQL port
});

// GET all events
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY ts DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new event
app.post('/events', async (req, res) => {
  const { childId, childName, who, note, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (child_id, child_name, who, note, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [childId, childName, who, note, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update event status
app.patch('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE events SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 Server running on  https://unwailed-creepier-cory.ngrok-free.dev'));
