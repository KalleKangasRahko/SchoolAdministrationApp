const db = require('../db');

class Class {
    constructor(id, timetable, subject, slot, room, teacher) {
        this.id = id;
        this.timetable = timetable;
        this.subject = subject;
        this.slot = slot;
        this.room = room;
        this.teacher = teacher;
    }

    // Gets all the classes a particular teacher teaches in a week
    static async getByTeacher(teacherId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT c.timetable, c.slot, c.subject, c.room, c.teacher, CONCAT(u.firstname, ' ', u.lastname) AS teacherName 
                FROM classes c LEFT JOIN users u ON c.teacher = u.id WHERE c.teacher = '${teacherId}' ORDER BY slot`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    // Gets the timetable for a particular student
    static async getByStudent(studentId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT c.slot, c.teacher, c.subject, c.room, c.teacher, CONCAT(u1.firstname, ' ', u1.lastname) AS teacherName 
                FROM classes c LEFT JOIN users u1 ON c.teacher = u1.id 
                LEFT JOIN timetables t ON t.id = c.timetable
                LEFT JOIN users u2 ON t.grade = u2.grade WHERE u2.id = '${studentId}'
                ORDER BY slot`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    // Gets the timetables of all the kids a parent has
    static async getByParent(parentId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT u2.id, u2.firstname, u2.lastname, t.grade, c.slot, c.subject, c.room, c.teacher, CONCAT(u1.firstname, ' ', u1.lastname) AS teacherName 
                FROM classes c LEFT JOIN users u1 ON c.teacher = u1.id 
                LEFT JOIN timetables t ON t.id = c.timetable
                LEFT JOIN users u2 ON t.grade = u2.grade 
                LEFT JOIN parents_children pc ON pc.child = u2.id WHERE pc.parent='${parentId}'
                ORDER BY id, slot`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    // Gets the classes in a timetable for viewing the timetable without any particular caveats
    static async getByTimetable(tableId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT c.timetable, c.slot, c.subject, c.room, c.teacher, CONCAT(u.firstname, ' ', u.lastname) AS teacherName 
            FROM classes c LEFT JOIN users u ON c.teacher = u.id WHERE c.timetable='${tableId}' ORDER BY slot`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    // This returns both the classes of a given timetable, as well as a list of all the teachers, in one single call
    // Used for the editing page where we need both
    static async getForEditing(tableId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT c.id, c.timetable, c.slot, c.subject, c.room, c.teacher, CONCAT(u1.firstname, ' ', u1.lastname) as teacherName, 
            u2.id AS dbTeacherId, CONCAT(u2.firstname, ' ', u2.lastname) as dbTeacherName FROM classes c LEFT JOIN users u1 
            ON c.teacher=u1.id cross JOIN users u2 WHERE c.timetable='${tableId}' AND u2.role=1 ORDER BY c.slot`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        //console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = `SELECT c.id, c.timetable, c.slot, c.subject, c.room, c.teacher, CONCAT(u.firstname, ' ', u.lastname) AS teacherName 
                    FROM classes c LEFT JOIN users u ON c.teacher = u.id`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        //console.log(result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }
}

module.exports = { Class };