const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

/**
 * Authentication controllers
 *
 * - createUser(req, res): registers a new user.
 *   Input: { name, email, password } in req.body.
 *   Output: 201 with { ok, uid, name, token } on success, 400/500 on error.
 *   Side-effects: hashes password, saves user, generates JWT.
 *
 * - login(req, res): authenticates an existing user.
 *   Input: { email, password } in req.body.
 *   Output: 201 with { ok, uid, name, token } on success, 400/500 on error.
 *
 * - renewToken(req, res): issues a fresh JWT.
 *   Input: req.uid and req.name (set by JWT validation middleware).
 *   Output: { ok, token }.
 */


// Post new user
/**
 * Register a new user.
 *
 * Expects: req.body = { name, email, password }
 * Returns: 201 with user id, name and token. 400 if email already exists.
 */
const createUser = async (req, res = express.response) => {

    try {
        const { name, email, password } = req.body;

        const findedUser = await User.findOne({ email });

        if (findedUser) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists with that email"
            })
        }

        const user = new User({ name, email, password });

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: "User created successfully",
            uid: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    }
}


// Post login
/**
 * Authenticate user with email and password.
 *
 * Expects: req.body = { email, password }
 * Returns: 201 with user id, name and token. 400 on invalid credentials.
 */
const login = async (req, res = express.response) => {
    const { email, password } = req.body;
    try {

        const findedUser = await User.findOne({ email });

        if (!findedUser) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exists with that email"
            })
        }

        const validPassword = bcrypt.compareSync(password, findedUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid password"
            })
        }

        //Generate JWT
        const token = await generateJWT(findedUser.id, findedUser.name);

        res.status(201).json({
            ok: true,
            uid: findedUser.id,
            name: findedUser.name,
            token
        })
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error logging in'
        });
    }
}

// Get token
/**
 * Renew JWT for an authenticated user.
 *
 * Requires: req.uid and req.name (from validateJWT middleware).
 * Returns: { ok: true, token } with a new token.
 */
const renewToken = async (req, res = express.response) => {
    // Generate JWT
    const token = await generateJWT(req.uid, req.name);
    res.json({
        ok: true,
        msg: "Renew token",
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}