const restricted = require('../../views/restriction');

// Validators for routes, as in, for restricting entry into pages where only certain users are allowed

module.exports = {

    // Validator for checking that the request comes from a user who's logged in
    checkIfUser: (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/');
        }
        else {
            next();
        }
    },

    // Validator for checking that the user is not trying to access somebody else's information
    checkIfCorrectUser: (req, res, next) => {
        if (req.session.user.id !== req.params.id) {
            res.send(restricted({ req }));
        }
        else {
            next();
        }
    },
    
    // Validator for checking that the user is in fact an admin
    checkIfAdmin: (req, res, next) => {
        if (!req.session.user || req.session.user.role !== 0) {
            res.send(restricted({ req }));
        }
        else {
            next();
        }
    },

    // Validator for checking that the user is an admin or a teacher
    checkIfTeacher: (req, res, next) => {
        if (!req.session.user || req.session.user.role > 1) {
            res.send(restricted({ req }));
        }
        else {
            next();
        }
    }
}