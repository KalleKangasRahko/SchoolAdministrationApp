const express = require('express');
const router = express.Router();
const axios = require('axios');
const { validationResult } = require('express-validator');

const overviewPage = require('../../views/scheduling/overview');
const managePage = require('../../views/scheduling/manage');
const createPage = require('../../views/scheduling/create');
const individualPage = require('../../views/scheduling/individual');
const gradePage = require('../../views/scheduling/grade');

const { checkIfTeacher } = require('./middlewares');
const { requireTeacherAndClassroomAvailability } = require('./validators');

// Timetable routes. Reading timetables, for students and parents
// Creating and editing them and assigning them to different grades, for teachers.

// The timetable overview
// Shows the timetable(s) relevant to the user, and for teachers the link for managing timetables
router.get('/', async (req, res) => {
    const user = req.session.user;
    let personalTable;
    let result;

    // The content of the page depends on the role of the user
    // Teacher get a timetable of classes that they themselves have to teach
    if (user.role === 1) {
        result = await axios.get(`http://localhost:3000/api/classes/teacher/${user.id}`);
        personalTable = result.data.response;
    }
    // Parents get several timetables, one for each child
    else if (user.role === 2) {
        result = await axios.get(`http://localhost:3000/api/classes/parent/${user.id}`);
        personalTable = result.data.response;
    }
    // Students get their own timetable, as in classes they have to attend
    else if (user.role === 3) {
        result = await axios.get(`http://localhost:3000/api/classes/student/${user.id}`);
        personalTable = result.data.response;
    }
    res.send(overviewPage({ req, personalTable }));
});

// Individual timetable, just for viewing
router.get('/grade/:grade', async (req, res) => {
    const result = await axios.get(`http://localhost:3000/api/classes/grade/${req.params.grade}`);
    personalTable = result.data.response;

    res.send(gradePage({ req, personalTable }));
});

// The list of timetables and the link for creating a new timetable
router.get('/manage', [checkIfTeacher], async (req, res) => {
    // Get the list of all the timetables
    const result = await axios.get('http://localhost:3000/api/timetables');
    const tables = result.data.response;
    res.send(managePage({ req, tables }));
});

// Individual timetable, for viewing and for assigning to a particular grade
router.get('/manage/:id', [checkIfTeacher], async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/classes/timetable/${id}`);
    const timetable = result.data.response;
    res.send(individualPage({ req, timetable }));
});

// The post-route for assigning a timetable for a particular grade
router.post('/manage/:id', async (req, res) => {
    const id = req.params.id;
    const { grade } = req.body;
    const gradeToSend = { grade }
    await axios.post(`http://localhost:3000/api/timetables/assign/${id}`, gradeToSend);
    res.redirect('/scheduling/manage');
})

// The page for creating a timetable
router.get('/create', [checkIfTeacher], async (req, res) => {
    // Get the list of all teachers for creating the timetable
    const result = await axios.get('http://localhost:3000/api/teachers');
    const teachers = result.data.response;
    res.send(createPage({ req, teachers }));
});

// The post-route for creating a timetable
router.post('/create', [requireTeacherAndClassroomAvailability], async (req, res) => {
    const classes = JSON.parse(req.body.classes);
    // Middleware validators make sure that the teachers and classrooms are all available on the given timeslots
    // If a double-booking presents itself, we return back to the scheduling-form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const result = await axios.get('http://localhost:3000/api/teachers');
        const teachers = result.data.response;
        return res.send(createPage({req, teachers, errors, classes}));
    }
    const { author } = req.body;
    const timetable = {
        author,
        classes
    }
    console.log(timetable);
    await axios.post('http://localhost:3000/api/timetables', timetable)
    res.redirect('/scheduling');
});

// Editing a timetable. Reuses the page that is used for creating timetables
router.get('/edit/:id', [checkIfTeacher], async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/classes/timetable/edit/${id}`);
    const data = result.data.response;

    // The data is both the classes in the timetable as well as a list of ALL the teachers in the db
    // This means that the array has a lot of duplicate objects (from a timetable perspective)
    // We need to filter out the names and ids of teachers, and then remove the duplicate objects
    // First we find all the distinct teachers from the data
    let teachersMap = new Map();
    let distinctTeachers = data.filter(item => {
        const val = teachersMap.get(item.dbTeacherName);
        if (val) {
            if (item.dbTeacherId < val) {
                teachersMap.delete(item.dbTeacherName);
                teachersMap.set(item.dbTeacherName, item.dbTeacherId);
                return true;
            }
            else {
                return false;
            }
        }
        teachersMap.set(item.dbTeacherName, item.dbTeacherId);
        return true;
    });
    // Creating a new array for the teachers so that the keys are correctly named:
    let teachers = [];
    for (let i = 0; i < distinctTeachers.length; i++) {
        let name = distinctTeachers[i].dbTeacherName;
        let names = name.split(' ');
        let teacher = { id: distinctTeachers[i].dbTeacherId, firstname: names[0], lastname: names[1]};
        teachers.push(teacher);
    }

    // Removing duplicate classes
    const slots = data.map(( { slot }) => slot);
    const classes = data.filter(({ slot }, index) => 
        !slots.includes(slot, index + 1));

    // We create an errors array so we won't accidentally send classes in it's place...
    const errors = [];

    // We also need to send the id of the table we're editing
    // In theory we could also just grab it from any of the supplied classes later on
    // However, we don't know which classes will be edited, and those ones will not contain the table id
    const tableId = classes[0].timetable;
    
    res.send(createPage({ req, teachers, errors, classes, tableId }));
});

// The post-route for editing a timetable
router.post('/edit/:id', [requireTeacherAndClassroomAvailability], async (req, res) => {
    const classes = JSON.parse(req.body.classes);

    // We need separate arrays for classes that have already existed, and are merely edited
    // And classes that haven't existed at all before
    let oldClasses = [];
    let newClasses = [];
    for (let lesson of classes) {
        if (lesson.id) {
            oldClasses.push(lesson);
        }
        else {
            newClasses.push(lesson);
        }
    }
    const { tableId, author } = req.body;
    // Middleware validators make sure that the teachers and classrooms are all available on the given timeslots
    // If a double-booking presents itself, we return back to the scheduling-form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const result = await axios.get('http://localhost:3000/api/teachers');
        const teachers = result.data.response;
        return res.send(createPage({req, teachers, errors, classes, tableId}));
    }
    const timetable = {
        id: tableId,
        author,
        oldClasses,
        newClasses
    }
    console.log(timetable);
    await axios.put(`http://localhost:3000/api/timetables/edit/`, timetable);
    res.redirect('/scheduling/manage');
})

module.exports = router;