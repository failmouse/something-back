const User = require('../models/user');

async function createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create(name, email, password);
        res.status(200).send('User registered successfully!');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
}

async function getAllUsers(req, res) {
    const users = await User.getAll();
    res.json(users);
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.update(id, name, email, password);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
}

async function deleteUser(req, res) {
    await User.delete(req.params.id);
    res.sendStatus(200);
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
