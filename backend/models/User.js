const pool = require('../db');

const User = {
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  async create({ name, email, password_hash, role }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
      [name, email, password_hash, role || 'user']
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
    return rows[0];
  },
};

module.exports = User;
