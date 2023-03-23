const jwt = require('jsonwebtoken');
const config = require('../config');

function generateToken(userId) {
    const payload = { userId };
    const options = { expiresIn: '72h' };
    return jwt.sign(payload, config.jwtSecret, options);
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded.userId;
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
