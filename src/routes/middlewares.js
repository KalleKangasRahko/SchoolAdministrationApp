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
    }
}