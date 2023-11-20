const express = require('express');
const router = express.Router();

const classController = require('../../controllers/classController');

router.get('/classes/teacher/:id', classController.getClassByTeacher);
router.get('/classes/student/:id', classController.getClassByStudent);
router.get('/classes/parent/:id', classController.getClassByParent);
router.get('/classes/timetable/:id', classController.getClassByTimetable);
router.get('/classes/timetable/edit/:id', classController.getClassesForEditing);
router.get('/classes', classController.getAllClasses);

module.exports = router;