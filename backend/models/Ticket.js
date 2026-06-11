const pool = require('../db');

const Ticket = {
  async create({ user_id, type, category, description, priority }) {
    const { rows } = await pool.query(
      'INSERT INTO tickets (user_id, type, category, description, priority, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, type, category, description, priority, 'Open']
    );
    return rows[0];
  },

  async findByUser(user_id) {
    const { rows } = await pool.query(
      'SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    return rows;
  },

  async findAll() {
    const { rows } = await pool.query(
      'SELECT t.*, u.name AS user_name FROM tickets t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC'
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    return rows[0];
  },

  async updateStatus(id, status) {
    const { rows } = await pool.query(
      'UPDATE tickets SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return rows[0];
  },
};

module.exports = Ticket;
