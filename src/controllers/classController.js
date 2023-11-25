const { Class } = require('./../models/class');
const crypto = require('crypto');

const classController = {
    async getClassByTeacher(req, res) {
        try {
            const result = await Class.getByTeacher(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassByStudent(req, res) {
        try {
            const result = await Class.getByStudent(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassByParent(req, res) {
        try {
            const result = await Class.getByParent(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassByGrade(req, res) {
        try {
            const result = await Class.getByGrade(req.params.grade);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassForNotes(req, res) {
        try {
            const result = await Class.getForNotes(req.params.grade);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassByTimetable(req, res) {
        try {
            const result = await Class.getByTimetable(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getClassesForEditing(req, res) {
        try {
            const result = await Class.getForEditing(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getAllClasses(req, res) {
        try {
            const result = await Class.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

}

module.exports = classController;