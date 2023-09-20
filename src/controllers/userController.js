const { User } = require('../models/user');
const { Admin } = require('../models/admin.js');
const { Guardian } = require('../models/guardian');
const { Student } = require('../models/student');
const { cryptPassword } = require('../../utils');
const crypto = require('crypto');

const userController = {
    async createUser(req, res) {
        try {
            // Destructure the form fields from the req.body
            const { email, password, role, firstname, lastname, address, phonenum, grade } = req.body;
            // Generate a random 8 character id for the user
            const userId = crypto.randomBytes(4).toString('hex');
            const hashed = await cryptPassword(password);
            const user = {
                id: userId,
                email,
                password: hashed,
                role: parseInt(role),
                firstname,
                lastname,
                address,
                phonenum,
                grade: parseInt(grade)
            };
            let result;
            if (user.role === 0) {
                result = await Admin.create(user);
            }
            else if (user.role === 1) {
                // create Teacher
            }
            else if (user.role === 2) {
                result = await Guardian.create(user);
            }
            else if (user.role === 3) {
                result = await Student.create(user);
            }
            else {
                return res.status(400).json({ error: 'Invalid role' });
            }
            res.status(201).json({ status: "OK", msg: "User created", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getUserById(req, res) {
        try {
            const result = await User.getById(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getUserByEmail(req, res) {
        try {
            const result = await User.getByEmail(req.params.email);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getAllUsers(req, res) {
        try {
            const result = await User.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedData = req.body;

            // Hash and salt the new password
            updatedData.password = await cryptPassword(updatedData.password);

            let result;
            if (req.body.role === 0) {
                result = await Admin.update(userId, updatedData);
            }
            else if (req.body.role === 1) {
                // update Teacher
            }
            else if (req.body.role === 2) {
                result = await Guardian.update(userId, updatedData);
            }
            else if (req.body.role === 3) {
                result = await Student.update(userId, updatedData);
            }
            else {
                return res.status(400).json({ error: 'Invalid role' });
            }
            res.status(201).json({ status: "OK", msg: "User updated", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async removeUser(req, res) {
        try {
            console.log('Removing ' + req.params.id);
            const user = JSON.parse(JSON.stringify(await User.getById(req.params.id)))[0];
            console.log(user);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.role === 0) {
                result = await Admin.remove(user.id);
            }
            else if (user.role === 1) {
                // create Teacher
            }
            else if (user.role === 2) {
                result = await Guardian.remove(user.id);
            }
            else if (user.role === 3) {
                result = await Student.remove(user.id);
            }
            else {
                return res.status(400).json({ error: 'Invalid role' });
            }
            res.status(201).json({ status: "OK", msg: "User removed", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },


    // Admin-controller
    async getAllAdmins(req,res) {
        try {
            const result = await Admin.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch(error) {
            res.status(500).json({ error });
        }
    },


    // Guardian-controller
    async getAllGuardians(req,res) {
        try {
            const result = await Guardian.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch(error) {
            res.status(500).json({ error });
        }
    },

    async getGuardiansByStudentId(req, res) {
        try {
            const result = await Guardian.getByStudent(req.params.studentId);
            res.json({ status: "OK", msg: "", response: result });

        }
        catch(error) {
            res.status(500).json({ error });
        }
    },


    // Student-controller
    async getAllStudents(req,res) {
        try {
            const result = await Student.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch(error) {
            res.status(500).json({ error });
        }
    },

    async getStudentsByGuardianId(req, res) {
        try {
            const result = await Student.getByGuardian(req.params.guardianId);
            res.json({ status: "OK", msg: "", response: result });

        }
        catch(error) {
            res.status(500).json({ error });
        }
    },

    async getStudentsForGuardian(req, res) {
        try {
            const result = await Student.getStudentsForGuardian();
            res.json({ status: "OK", msg: "", response: result });

        }
        catch(error) {
            res.status(500).json({ error });
        }
    },

    async getStudentsByGrade(req, res) {
        try {
            const result = await Student.getByGrade(req.params.grade);
            res.json({ status: "OK", msg: "", response: result });

        }
        catch(error) {
            res.status(500).json({ error });
        }
    },

    async removeChildFromGuardian(req, res) {
        try {
            const result = await Student.removeChild(req.params.id);
            res.json({ status: "OK", msg: "", response: result});
        }
        catch(error) {
            res.status(500).json({ error });
        }
    }

};

module.exports = userController;

