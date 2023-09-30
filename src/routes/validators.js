const { check, validationResult } = require('express-validator');
const { comparePasswords } = require('../../utils');
const axios = require('axios');
const restricted = require('../../views/restriction');

module.exports = {
    // Validator for checking that the user is in fact an admin
    checkIfAdmin: (req, res, next) => {
        if (!req.session.user || req.session.user.role !== 0) {
            res.send(restricted({ req, role: 'Admin' }));
        }
        else {
            next();
        }
    },


    // Validators for creating a user
    // Checking if there already is a user for this e-mail address
    requireEmail: check('email')
        .trim()
        .isEmail()
        .custom(async (email) => {
            const result = await axios.get(`http://localhost:3000/api/users/email/${email}`);
            if (result.data.response) {
                throw new Error('This e-mail is taken');
            }
        }),
    // Checking that the password is sufficiently long
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),
    // Checking that the passwords match
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            }
            else {
                return true;
            }
        }),
    // Checking that a role was selected
    requireRole: check('role')
        .custom((role) => {
            role = parseInt(role);
            console.log(role);
            if (isNaN(role)) {
                throw new Error('Select a role for the user');
            }
            else {
                return true;
            }
        }),


    // Validators for logging in 
    // Checking that the e-mail is an e-mail address and not just some string
    requireValidEmail: check('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid e-mail address'),
    // Checking that a password was actually entered
    requirePasswordExists: check('password')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Please enter a password'),
    // Checking that there is a user for this e-mail
    requireUser: check('email')
        .custom(async (email) => {
            const result = await axios.get(`http://localhost:3000/api/users/email/${email}`);
            if (!result.data.response) {
                throw new Error('No account found');
            }
        }),
    // Checking that the password is correct for the user trying to log in
    requireCorrectPassword: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const result = await axios.get(`http://localhost:3000/api/users/email/${req.body.email}`);
            if (result.data.response) {
                const comparison = await comparePasswords(result.data.response.password, password);
                if (!comparison) {
                    throw new Error('Invalid password');
                }
            }
        }),

    // Validators regarding the personal info of users
    // Checking that a first name, last name, an address and a valid phone number were entered
    requireFirstName: check('firstname')
        .custom((firstname, role) => {
            role = parseInt(role);
            if (role !== 0 && firstname === '') {
                throw new Error('Enter a first name');
            }
            else {
                return true;
            }
        }),
    requireLastName: check('lastname')
        .custom((lastname, role) => {
            role = parseInt(role);
            if (role !== 0 && lastname === '') {
                throw new Error('Enter a last name');
            }
            else {
                return true;
            }
        }),
    requireAddress: check('address')
        .custom((address, role) => {
            role = parseInt(role);
            if (role !== 0 && address === '') {
                throw new Error('Enter an address');
            }
            else {
                return true;
            }
        }),
    requirePhonenum: check('phonenum')
        .trim()
        .custom((phonenum, role) => {
            role = parseInt(role);
            if (role !== 0 && phonenum.length < 10) {
                throw new Error('Enter a valid phone number');
            }
            else {
                return true;
            }
        }),
}