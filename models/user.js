const { Pool } = require('pg');
const config = require('../config');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const pool = new Pool(config.db);

class User {
    static async create(name, email, password) {
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        return result.rows[0];
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT id, name, email FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await pool.query(
            'SELECT id, name, email FROM users ORDER BY id'
        );
        return result.rows;
    }

    static async update(id, name, email, password) {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $4 WHERE id = $3 RETURNING id, name, email',
            [name, email, id, password]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM users WHERE id = $1',
            [id]
        );
    }
}

module.exports = User;
