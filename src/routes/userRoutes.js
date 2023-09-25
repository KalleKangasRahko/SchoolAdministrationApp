const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Routes for the generic User-class
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.removeUser);

// Routes for admins
router.get('/admins', userController.getAllAdmins);

// Routes for guardians
router.get('/guardians', userController.getAllGuardians);

// Routes for students
router.get('/students', userController.getAllStudents);
router.get('/students/list', userController.getStudentsForGuardian);
router.get('/students/grade/:grade', userController.getStudentsByGrade);

module.exports = router;

