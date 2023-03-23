const User = require('../models/user.model');
const authUtils = require('../utils/auth.utils');
const responseUtils = require('../utils/response.utils');
const hashPassword = require('../utils/password.utils');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        await User.registerUser(name, email, hashedPassword).then(
            user => {
                responseUtils.sendSuccessResponse(res, { "user": user, "token": authUtils.generateToken(user.id) });
            }
        );
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.loginUser(email);

        if (user) {
            const isValidPass = await bcrypt.compare(password, user.password);

            if (isValidPass) {
                delete user.password;
                responseUtils.sendSuccessResponse(res, { "user": user, "token": authUtils.generateToken(user.id) });
            }
            else responseUtils.sendErrorResponse(res, 'Wrong email or password');

        } else {
            responseUtils.sendErrorResponse(res, 'Wrong email or password');
        }
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function getUser(req, res) {
    const { userId } = req;

    try {
        const user = await User.getUser(userId);

        if (user) {
            responseUtils.sendSuccessResponse(res, user)
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.getAll();
        responseUtils.sendSuccessResponse(res, users)
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function updateUser(req, res) {
    const { userId } = req;
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        const user = await User.updateUser(userId, name, email, hashedPassword);

        if (user) {
            responseUtils.sendSuccessResponse(res, user)
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser
};
