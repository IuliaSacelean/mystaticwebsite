const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files from current folder
app.use(express.static(__dirname));

// ✅ PostgreSQL connection
const pool = new Pool({
  user: 'iuliacarla',
  host: 'localhost',
  database: 'iuliacarla',
  password: 'your_password',
  port: 5432
});

// ✅ GET all events (with optional group filtering)
app.get('/events', async (req, res) => {
  const group = req.query.group;
  try {
    const result = group
      ? await pool.query('SELECT * FROM events WHERE "group" = $1 ORDER BY ts DESC', [group])
      : await pool.query('SELECT * FROM events ORDER BY ts DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /events error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new event (includes group)
app.post('/events', async (req, res) => {
  const { child_id, child_name, who, note, status, group } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (child_id, child_name, who, note, status, "group", ts) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [child_id, child_name, who, note, status, group]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /events error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ PATCH update event status
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

// ✅ GET analytics
app.get('/analytics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM analytics ORDER BY ts DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST analytics (uses group_name instead of reserved "group")
app.post('/analytics', async (req, res) => {
  const { page, event, action, timestamp, group } = req.body;
  const group_name = group?.trim().toLowerCase() || null;

  try {
    const result = await pool.query(
      'INSERT INTO analytics (page, event, action, group_name, ts) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [page, event, action || null, group_name, timestamp || new Date().toISOString()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on https://unwailed-creepier-cory.ngrok-free.dev');
});
