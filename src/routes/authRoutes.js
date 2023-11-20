const express = require('express');
const router = express.Router();
const axios = require('axios');
const { validationResult } = require('express-validator');
const loginPage = require('../../views/auth/login');
const loginFail = require('../../views/auth/loginFail');
const loggedIn = require('../../views/auth/loggedIn');
const dashboard = require('../../views/dashboard');
const { requireValidEmail, requireUser, requireCorrectPassword, requirePasswordExists} = require('./validators');


// The front page of the whole app, for logging in
router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    else {
        res.send(loginPage({ req }));
    }
});

// Post-route for logging in
router.post('/',
    // First we check that the e-mail and password are valid, format-wise
    [requireValidEmail, requirePasswordExists, requireUser, requireCorrectPassword],
    async (req, res) => {
        // If there was any problem with either the e-mail or password, we return right away, with messages
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(loginPage({ req, errors }));
        }

        const { email } = req.body;

        try {
            const result = await axios.get(`http://localhost:3000/api/users/email/${email}`);
            const user = result.data.response;

            req.session.user = user;
            if (req.session.user.role === 0) {
                res.redirect('/admin');
            }
            else if (req.session.user.role === 1) {
                res.redirect('/dashboard');
            }
            else if (req.session.user.role === 2) {
                res.redirect('/dashboard');
            }
            else if (req.session.user.role === 3) {
                res.redirect('/dashboard');
            }

        }
        catch {
            res.redirect('/loginfail');
        }
    });

router.get('/loginfail', async (req, res) => {
    res.send(loginFail({ req }));
});

router.get('/logout', async (req, res) => {
    req.session = null;
    res.redirect('/');
});

router.get('/dashboard', async (req, res) => {
    res.send(dashboard({ req }))
});

module.exports = router;