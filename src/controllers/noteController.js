const { Note } = require('../models/note');

const noteController = {
    async saveNote(req, res) {
        try {
            const notes = req.body;
            const result = await Note.save(notes);
            res.status(201).json({ status: "OK", msg: "Notes saved", response: result }); 
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getNotesForParent(req, res) {
        try {
            const result = await Note.getForParent(req.params.id);
            res.status(201).json({ status: "OK", msg: "Notes saved", response: result }); 
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getNotesForStudent(req, res) {
        try {
            const result = await Note.getForStudent(req.params.id);
            res.status(201).json({ status: "OK", msg: "Notes saved", response: result }); 
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = noteController;