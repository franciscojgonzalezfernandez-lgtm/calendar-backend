const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Middleware: validateFields
 *
 * Uses express-validator to check request validation results. If there are
 * validation errors it responds with 400 and { ok: false, errors }.
 * Otherwise it calls next().
 *
 * Typical usage: add validators in route definitions, then this middleware
 * to return a formatted error response when validation fails.
 */
const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validateFields
}