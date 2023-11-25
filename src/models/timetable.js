const db = require('../db');
const crypto = require('crypto');

class Timetable {
    constructor(id, author, grade) {
        this.id = id;
        this.author = author;
        this.grade = grade;
    }

    async create(classes) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO timetables (ID, AUTHOR, GRADE) VALUES (?, ?, 0);`;
            try {
                db.query(q, [this.id, this.author],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        else {
                            console.log(result);
                            for (let lesson of classes) {
                                this.saveLesson(lesson);
                            }
                            resolve(result);
                        }
                    });
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    // After saving the row in the timetable-table, save all the classes in the classes-table
    async saveLesson(lesson) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO classes (ID, TIMETABLE, SLOT, SUBJECT, ROOM, TEACHER) VALUES (?, ?, ?, ?, ?, ?)`;
            const classId = crypto.randomBytes(4).toString('hex');
            try {
                db.query(q, [classId, this.id, lesson.slot, lesson.subject, lesson.room, lesson.teacher],
                    (error, result) => {
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
                console.log(error);
                reject(error);
            }
        });
    }

    // Assigning a grade for a timetable. First it clear the other timetable for the same grade and substitutes the new one
    async assignGrade(grade) {
        return new Promise((resolve, reject) => {
            const q = `UPDATE timetables SET grade=0 WHERE grade=${grade}; 
                        UPDATE timetables SET grade=${grade} WHERE id='${this.id}'`;
            console.log(q);
            // This btw is the only time in the app where we use multiple statements in one query
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

    // Updating a timetable. This just updates the edited- and author- (last editor) columns
    // The classes are then updated in a separate method, which, however, is tied to this one
    async update(oldClasses, newClasses) {
        return new Promise((resolve, reject) => {
            const q = `UPDATE timetables SET edited=now(), author='${this.author}' WHERE id='${this.id}'`;
            console.log(q);
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        console.log(result);
                        for (let lesson of oldClasses) {
                            this.updateLesson(lesson);
                        }
                        for (let lesson of newClasses) {
                            this.saveLesson(lesson);
                        }
                        resolve(result);
                    }
                });
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    // This updates the classes (or lessons, whichever you want to call it....)
    async updateLesson(lesson) {
        return new Promise((resolve, reject) => {
            const q = `UPDATE classes SET subject=${lesson.subject},
                        room=${lesson.room},
                        teacher='${lesson.teacher}'
                        WHERE timetable='${this.id}' AND slot=${lesson.slot}`;
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
                console.log(error);
                reject(error);
            }
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = `SELECT t.id, t.author, CONCAT(u.firstname, ' ', u.lastname) AS authorName, 
                t.grade, t.edited from timetables t LEFT JOIN users u ON u.id=t.author ORDER BY edited DESC`;
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
}

module.exports = { Timetable };