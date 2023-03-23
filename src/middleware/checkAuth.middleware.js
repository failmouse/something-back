const auth = require('../utils/auth.utils');

function checkAuth(req, res, next) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = auth.verifyToken(token);

            req.id = decoded;

            next();
        } catch (e) {
            return res.status(403).json({ message: 'No acess' });
        }
    }
    else {
        return res.status(403).json({ message: 'No acess' });
    }

};

module.exports = checkAuth;