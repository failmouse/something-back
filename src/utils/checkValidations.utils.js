const validator = require("express-validator");

function checkValidation(req, res, next) {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    next();
}

module.exports = checkValidation;