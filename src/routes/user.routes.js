const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/checkAuth.middleware');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', checkAuth, userController.getUser);
router.put('/me', checkAuth, userController.updateUser);
router.get('/all', userController.getAllUsers);

module.exports = router;
