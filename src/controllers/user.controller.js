const userService = require('../services/user.service');
const authUtils = require('../utils/auth.utils');
const responseUtils = require('../utils/response.utils');

async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        await userService.createUser(name, email, password).then(
            user => {
                responseUtils.sendSuccessResponse(res, authUtils.generateToken(user.id));
            }
        );
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userService.loginUser(email, password);

        if (user) {
            responseUtils.sendSuccessResponse(res, { "user": user, "token": authUtils.generateToken(user.id) });
        } else {
            responseUtils.sendErrorResponse(res, 'Wrong email or password');
        }
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function getUser(req, res) {
    const id = req.id;

    try {
        const user = await userService.getUser(id);
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
        const users = await userService.getAllUsers();
        responseUtils.sendSuccessResponse(res, users)
    } catch (err) {
        responseUtils.sendErrorResponse(res, err.message);
    }
}

async function updateUser(req, res) {
    const id = req.id;
    const { name, email, password } = req.body;
    try {
        const user = await userService.updateUser(id, name, email, password);
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
