const express = require('express');
const router = express.Router();

const timetableController = require('../../controllers/timetableController');

router.get('/timetables', timetableController.getAllTimetables);
router.post('/timetables', timetableController.createTimetable);
router.post('/timetables/assign/:id', timetableController.assignGrade);
router.put('/timetables/:id', timetableController.updateTable);

module.exports = router;