const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.db);

class User {
    constructor({ id, name, email, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async registerUser(name, email, password) {

        const query = {
            text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            values: [name, email, password],
        };

        const result = await pool.query(query);

        return new User(result.rows[0]);
    }

    static async loginUser(email) {
        const query = {
            text: 'SELECT id, name, email, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return null;
        }

        return new User(result.rows[0]);
    }

    static async getUser(id) {
        const query = {
            text: 'SELECT name, email FROM users WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return null;
        }

        return new User(result.rows[0]);
    }

    static async getAll() {
        const query = {
            text: 'SELECT name, email FROM users ORDER BY id',
        };

        const result = await pool.query(query);

        return result.rows.map((row) => new User(row));
    }

    static async updateUser(id, name, email, password) {

        const query = {
            text: 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email',
            values: [name, email, password, id],
        };

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return null;
        }

        return new User(result.rows[0]);
    }
}

module.exports = User;
