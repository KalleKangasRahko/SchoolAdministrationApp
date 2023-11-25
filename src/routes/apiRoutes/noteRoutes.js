const express = require('express');
const router = express.Router();

const noteController = require('../../controllers/noteController');

// All the routes here are '.../api/something'

router.get('/notes/parent/:id', noteController.getNotesForParent);
router.get('/notes/student/:id', noteController.getNotesForStudent);
router.post('/notes', noteController.saveNote);

module.exports = router;