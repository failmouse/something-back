const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createUser(name, email, password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.registerUser(name, email, hashedPassword);

    return user;
}

async function loginUser(email, password) {
    const user = await User.loginUser(email);

    if (user) {
        const isValidPass = await bcrypt.compare(password, user.password);

        if (isValidPass) {
            return user;
        }
    }

    return null;
}

async function getUser(id) {
    const user = await User.getUser(id);
    return user;
}

async function getAllUsers() {
    const users = await User.getAll();
    return users;
}

async function updateUser(id, name, email, password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.updateUser(id, name, email, hashedPassword);
    return user;
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser,
};
