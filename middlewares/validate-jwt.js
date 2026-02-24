const jwt = require('jsonwebtoken');
const { response } = require('express');

/**
 * Middleware: validateJWT
 *
 * Verifies a JWT sent in the 'x-token' header. On success it attaches
 * `uid` and `name` to req and calls next(). On failure it returns 401
 * with { ok: false, msg }.
 *
 * Example: set header 'x-token: <jwt>' when calling protected endpoints.
 */
const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.name = name;
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}