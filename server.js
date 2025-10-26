const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL connection
const pool = new Pool({
  user: 'iuliacarla',
  host: 'localhost',
  database: 'iuliacarla',
  password: 'your_password', // replace with your actual password
  port: 5432
});

// ✅ GET all events (with optional group filtering)
app.get('/events', async (req, res) => {
  const group = req.query.group?.trim().toLowerCase();
  try {
    const result = group
      ? await pool.query(
          'SELECT * FROM events WHERE LOWER(group_name) = $1 ORDER BY ts DESC',
          [group]
        )
      : await pool.query('SELECT * FROM events ORDER BY ts DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /events error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new event (uses group_name)
app.post('/events', async (req, res) => {
  const { child_id, child_name, who, note, status, group_name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO events (child_id, child_name, who, note, status, group_name, ts)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [child_id, child_name, who, note, status, group_name?.trim().toLowerCase()]
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
      `INSERT INTO analytics (page, event, action, group_name, ts)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [page, event, action || null, group_name, timestamp || new Date().toISOString()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new expense
app.post('/expenses', async (req, res) => {
  const { amount, category, month } = req.body;
  console.log('📥 Incoming expense:', { amount, category, month }); // ✅ Add this

  try {
    const result = await pool.query(
      `INSERT INTO expenses (amount, category, month)
       VALUES ($1, $2, $3) RETURNING *`,
      [amount, category, month]
    );
    console.log('✅ Saved to DB:', result.rows[0]); // ✅ Add this
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ POST /expenses error:', err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET all expenses
app.get('/expenses', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM expenses ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /expenses error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create expenses table if missing
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      amount NUMERIC(10,2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      month TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
})();

// ✅ Serve static files LAST
app.use(express.static(__dirname));

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on https://yourdailyqadose.com');
});
