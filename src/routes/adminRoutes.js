const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check, validationResult } = require('express-validator');
const restricted = require('../../views/restriction');
const usersPage = require('../../views/admin/usersTable');
const addUserPage = require('../../views/admin/addUser');
const editUserPage = require('../../views/admin/editUser');
const editChildrenPage = require('../../views/admin/editChildren');
const addChildrenPage = require('../../views/admin/addChildren');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireRole } = require('./validators');

// A table of all the users in the app
router.get('/', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 0) {
        res.send(restricted('Admin'));
    }
    else {
        const result = await axios.get(`http://localhost:3000/api/users`);
        const users = result.data.response;
        res.send(usersPage({ req, users }));
    }
});

// Adding users
router.get('/adduser', async (req, res) => {
    res.send(addUserPage({ req }));
});

router.post('/adduser',
    [requireEmail, requirePassword, requirePasswordConfirmation, requireRole],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.send(addUserPage({ req, errors }));
            }

            const { email, password, role, firstname, lastname, address, phonenum, grade } = req.body;

            const newUser = {
                email,
                password,
                role: parseInt(role),
                firstname,
                lastname,
                address,
                phonenum,
                grade
            };
            await axios.post('http://localhost:3000/api/users', newUser);
            res.redirect('/admin');
        }
        catch (error) {
            res.redirect('/admin');
        }
    });

// Editing users
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user = result.data.response[0];
    res.send(editUserPage({ req, user }));
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { email, password, role, firstname, lastname, address, phonenum, grade } = req.body;
    console.log('Editing ' + id);
    const user = {
        email,
        password,
        role: parseInt(role),
        firstname,
        lastname,
        address,
        phonenum,
        grade: parseInt(grade)
    };
    console.log(user);
    await axios.put(`http://localhost:3000/api/users/${id}`, user);
    res.redirect('/admin');
});

// Adding or removing children of a guardian
router.get('/edit/children/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user = result.data.response.map((item) => {
        return item;
    });
    res.send(editChildrenPage({ req, user }));
});

// Post-request for removing children
// We use post because it allows us to send a body with the request
router.post('/edit/children/:id', async (req, res) => {
    const { parentId, childId } = req.body;
    const ids = { parentId, childId };
    await axios.post(`http://localhost:3000/api/parentchild/sever`, ids);
    res.redirect(`/admin/edit/children/${parentId}`);
});

// Adding children
router.get('/edit/children/add/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/students/list`);
    console.log('the kids:');
    const students = result.data.response;
    res.send(addChildrenPage({ req, students, id }))
});

// Post-request for adding children
router.post('/edit/children/add/:id', async (req, res) => {
    const { parentId, childId } = req.body;
    const ids = { parentId, childId };
    await axios.post(`http://localhost:3000/api/parentchild/connect`, ids);
    res.redirect(`/admin/edit/children/${parentId}`);
});

// Removing users
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await axios.delete(`http://localhost:3000/api/users/${id}`);
    res.redirect('/admin');
});

module.exports = router;