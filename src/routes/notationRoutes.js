const express = require('express');
const router = express.Router();
const axios = require('axios');

const notationPage = require('../../views/notation/notation');
const notesPage = require('../../views/notation/notes');

const { checkIfCorrectUser, checkIfTeacher } = require('./middlewares');

// Notation routes. Adding, editing, and removing students' notes, for teachers.
// For parents: checking to see what notes, if any, their children have been given.

// The page for viewing either the notes of guardian-type user's children of student-type's very own!
router.get('/notes/:id', [checkIfCorrectUser], async (req, res) => {
    const user = req.session.user;
    let notes;
    // If the user is a parent, get the notes of their children
    if (user.role === 2) {
        const result = await axios.get(`http://localhost:3000/api/notes/parent/${user.id}`);
        notes = result.data.response;
    }
    // If the user is a student, get their own notes
    else if (user.role === 3) {
        const result = await axios.get(`http://localhost:3000/api/notes/student/${user.id}`);
        notes = result.data.response;
    }
    else {
        notes = [];
    }
    res.send(notesPage({ req, notes }));
})

// The page that is used for both adding and editing notes
router.get('/grade/:grade', [checkIfTeacher], async (req, res) => {

    // This query returns every student on the grade, times the classes in a week, plus all the notes of each student
    // So we need to do some pruning and divide the data into more understandable arrays
    const result = await axios.get(`http://localhost:3000/api/classes/notes/${req.params.grade}`);
    const data = result.data.response;

    // First we pick the distinct students from the data
    let studentsMap = new Map();
    let students = data.filter(item => {
        const val = studentsMap.get(item.studentName);
        if (val) {
            if (item.studentId < val) {
                studentsMap.delete(item.studentName);
                studentsMap.set(item.studentName, item.studentId);
                return true;
            }
            else {
                return false;
            }
        }
        studentsMap.set(item.studentName, item.studentId);
        return true;
    });

    // Removing duplicate classes, or rather creating an array where each slot is only featured once
    const slots = data.map(({ classSlot }) => classSlot);
    const filtered = data.filter(({ classSlot }, index) =>
        !slots.includes(classSlot, index + 1));
    
    // Let's create an array with just the classes
    let classes = []
    for (let item of filtered) {
        const lesson = { slot: item.classSlot, subject: item.subject };
        classes.push(lesson);
    }
    // Let's also add objects for empty classes as well, just to simplify things further down
    for (let i = 1; i < 36; i++) {
        if (!(classes.some(c => c.slot === i))) {
            const item = { slot: i, subject: 0 };
            classes.push(item);
        }
    }
    classes.sort((a, b) => {
        return a.slot - b.slot;
    });

    // In the data, each notes is featured once for each class a student has
    // Let's again remove the duplicates and just have each note once
    const notes = data.map(({ noteId }) => noteId);
    const filteredNotes = data.filter(({ noteId }, index) =>
        !notes.includes(noteId, index + 1));

    res.send(notationPage({ req, classes, students, notes: filteredNotes }));
});

router.post('/grade/:grade', async (req, res) => {
    const clientNotes = JSON.parse(req.body.notes);
    let notes = [];
    for (let note of clientNotes) {
        const newNote = {
            student: note.student,
            date: note.date,
            slot: parseInt(note.slot),
            subject: parseInt(note.subject),
            reason: parseInt(note.reason)
        }
        notes.push(newNote);
    }
    await axios.post('http://localhost:3000/api/notes', notes)
    res.redirect(`/notation/grade/${req.params.grade}`);
})

module.exports = router;