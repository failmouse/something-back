module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    db: {
        user: process.env.DB_USER || 'admin',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'something',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 5432
    }
};
