const db = require('../db');

class Note {
    constructor(student, date, slot, reason) {
        this.student = student;
        this.date = date;
        this.slot = slot;
        this.subject = subject;
        this.reason = reason;
    }

    static async save(notes) {
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO notes (STUDENT, DATE, SLOT, SUBJECT, REASON) VALUES ('${notes[0].student}', '${notes[0].date}', 
                        ${notes[0].slot}, ${notes[0].subject} , ${notes[0].reason})`;
            if (notes.length > 1) {
                for (let i = 1; i < notes.length; i++) {
                    q = q + `, ('${notes[i].student}', '${notes[i].date}', ${notes[i].slot}, ${notes[i].subject}, ${notes[i].reason})`;
                }
            }
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
        });
    }

    static async getForParent(parentId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT u.id AS studentId, CONCAT(u.firstname, ' ', u.lastname) AS studentName, n.reason, n.date, n.slot, n.subject 
                        FROM users u LEFT JOIN parents_children pc ON u.id=pc.child 
                        LEFT JOIN notes n ON n.student=u.id WHERE pc.parent='${parentId}' ORDER BY studentId, DATE, slot`;
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
        });
    }

    static async getForStudent(studentId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT u.id AS studentId, CONCAT(u.firstname, ' ', u.lastname) AS studentName, n.reason, n.date, n.slot, n.subject 
                        FROM users u LEFT JOIN notes n ON n.student=u.id WHERE u.id='${studentId}' ORDER BY date, slot`;
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
        });
    }
}

module.exports = { Note };