const { Time } = require('mssql');
const { Timetable } = require('../models/timetable');
const crypto = require('crypto');

const timetableController = {
    async createTimetable(req, res) {
        try {
            const { author, classes } = req.body;
            const tableId = crypto.randomBytes(4).toString('hex');
            const timetable = new Timetable(tableId, author);
            const result = await timetable.create(classes);
            res.status(201).json({ status: "OK", msg: "Timetable created", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async assignGrade(req, res) {
        try {
            const id = req.params.id;
            const { grade } = req.body;
            console.log(req.body);

            const timetable = new Timetable(id);
            const result = await timetable.assignGrade(grade);
            res.status(201).json({ status: "OK", msg: "Grade assigned", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }, 

    async updateTable(req, res) {
        try {
            // TODO: make sure a tableId is supplied...
            const { id, author, classes } = req.body;
            const timetable = new Timetable(id, author);
            const result = await timetable.update(classes);
            res.status(201).json({ status: "OK", msg: "Timetable updated", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getAllTimetables(req, res) {
        try {
            const result = await Timetable.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = timetableController;