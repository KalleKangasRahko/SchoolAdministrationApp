const express = require('express');
const router = express.Router();
const axios = require('axios');
const profilePage = require('../../views/profiles/profile');
const studentsPage = require('../../views/profiles/students');
const gradePage = require('../../views/profiles/grade');

// Profile routes. Reading user information and lists of students in a grade

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user = result.data.response.map(item => {
        return item;
    });
    res.send(profilePage({ req, user }));
});

router.get('/students', async (req, res) => {
    res.send(studentsPage({ req }));
});

router.get('/students/grade/:grade', async (req, res) => {
    const grade = req.params.grade;
    const result = await axios.get(`http://localhost:3000/api/students/grade/${grade}`);
    const students = result.data.response;
    res.send(gradePage({ req, students }));
})

module.exports = router;