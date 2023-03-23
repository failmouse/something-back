const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validations = require('../validation');
const checkValidations = require('../utils/checkValidations.utils');
const checkAuth = require('../middleware/checkAuth.middleware');

router.post('/register', validations.registerValidation, checkValidations, userController.createUser);
router.post('/login', validations.loginValidation, checkValidations, userController.loginUser);
router.get('/get-me', checkAuth, userController.getUser);
router.put('/update-me', checkAuth, userController.updateUser);
router.get('/get-all', userController.getAllUsers);

module.exports = router;
