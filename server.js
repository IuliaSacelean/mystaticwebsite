// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'iuliacarla',
  password: 'your_password',
  port: 5432
});

// GET all events
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY ts DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /events error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new event
app.post('/events', async (req, res) => {
  const { child_id, child_name, who, note, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (child_id, child_name, who, note, status, ts) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [child_id, child_name, who, note, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /events error:', err);
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
    console.error('PATCH /events/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 Server running on https://unwailed-creepier-cory.ngrok-free.dev/events'));
