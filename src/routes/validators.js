const { check, validationResult } = require('express-validator');
const { comparePasswords } = require('../../utils');
const axios = require('axios');

const { getRoom } = require('../../utils');

module.exports = {

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
        .custom((firstname, { req }) => {
            role = parseInt(req.body.role);
            if (role !== 0 && firstname === '') {
                throw new Error('Enter a first name');
            }
            else {
                return true;
            }
        }),
    requireLastName: check('lastname')
        .custom((lastname, { req }) => {
            role = parseInt(req.body.role);
            if (role !== 0 && lastname === '') {
                throw new Error('Enter a last name');
            }
            else {
                return true;
            }
        }),
    requireAddress: check('address')
        .custom((address, { req }) => {
            role = parseInt(req.body.role);
            if (role !== 0 && address === '') {
                throw new Error('Enter an address');
            }
            else {
                return true;
            }
        }),
    requirePhonenum: check('phonenum')
        .trim()
        .custom((phonenum, { req }) => {
            role = parseInt(req.body.role);
            if (role !== 0 && phonenum.length < 10) {
                throw new Error('Enter a valid phone number');
            }
            else {
                return true;
            }
        }),

    // Validators for timetables
    // Checking that both the teacher and the classroom are available at required time so that we can avoid double-bookings
    requireTeacherAndClassroomAvailability: check('classes')
        .custom(async (classes) => {
            const givenClasses = JSON.parse(classes);
            const result = await axios.get('http://localhost:3000/api/classes');
            if (result.data.response) {
                const queriedClasses = result.data.response;
                for (let i = 0; i < givenClasses.length; i++) {
                    for (let j = 0; j < queriedClasses.length; j++) {
                        // The class only has the timetable-key IF it has been created before and is now edited
                        // So if it does, we need to make sure it is the same value as the timetable of the queried class
                        // Meaning: teacher being booked at this time is only an issue if it is in a different timetable
                        // Otherwise we wouldn't be able to edit the timetable at all because the existing classes would cause
                        // the teacher to be considered booked at any given time
                        if (givenClasses[i].timetable) {
                            if (givenClasses[i].slot === queriedClasses[j].slot && givenClasses[i].teacher === queriedClasses[j].teacher && givenClasses[i].timetable !== queriedClasses[j].timetable) {
                                throw new Error(`${queriedClasses[j].teacherName} is already taken in slot ${givenClasses[i].slot}`);
                            }
                        }
                        else {
                            if (givenClasses[i].slot === queriedClasses[j].slot && givenClasses[i].teacher === queriedClasses[j].teacher) {
                                throw new Error(`${queriedClasses[j].teacherName} is already taken in slot ${givenClasses[i].slot}`);
                            }
                        }
                    }
                }
                for (let i = 0; i < givenClasses.length; i++) {
                    // Ditto with the classroom. The classroom being booked is only an issue if it is in a different timetable
                    for (let j = 0; j < queriedClasses.length; j++) {
                        if (givenClasses[i].timetable) {
                            if (givenClasses[i].slot === queriedClasses[j].slot && givenClasses[i].room === queriedClasses[j].room && givenClasses[i].timetable !== queriedClasses[j].timetable) {
                                throw new Error(`${getRoom(queriedClasses[j].room)} is already taken in slot ${givenClasses[i].slot}`);
                            }
                        }
                        else {
                            if (givenClasses[i].slot === queriedClasses[j].slot && givenClasses[i].room === queriedClasses[j].room) {
                                throw new Error(`${getRoom(queriedClasses[j].room)} is already taken in slot ${givenClasses[i].slot}`);
                            }
                        }
                    }
                }
            }
        })
}