const validator = require("express-validator");

module.exports = {
    registerValidation: [
        validator.body('name', "Name must be at least 5 characters").isLength({ min: 5 }),
        validator.body('email', "Invalid mail format").isEmail(),
        validator.body('password', "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    loginValidation: [
        validator.body('email', "Invalid mail format").isEmail(),
        validator.body('password', "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
}
