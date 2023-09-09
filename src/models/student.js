const db = require('../db');
const { User } = require('./user.js');

// Student-methods
class Student extends User {
    constructor(id, email, password, role, firstname, lastname, address, phonenum, grade) {
        super(id, email, password, role, firstname, lastname);
        this.address = address;
        this.phonenum = phonenum;
        this.grade = grade;
    }

    // Tested and works!
    static async create(userData) {
        return new Promise((resolve, reject) => {
            const { id, email, password, firstname, lastname, address, phonenum, grade } = userData;
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM, GRADE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            try {
                db.query(q, [id, email, password, 3, firstname, lastname, address, phonenum, grade],
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

    // Tested and works!
    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = 'SELECT * FROM users WHERE role=3';
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

    // Tested and works!
    // Get children (students) of a certain guardian
    static async getByGuardian(guardianId) {
        console.log('Searching for a student by guardian...');
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM parents_children inner JOIN users ON parents_children.child=users.id AND parent='${guardianId}'`;
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

    static async getByGrade(grade) {
        console.log('Searching for a student by grade...');
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM users WHERE role=3 AND grade=${grade}`;
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

    // Tested and works!
    static async update(userId, updatedData) {
        return new Promise((resolve, reject) => {
            console.log(updatedData);
            const { email, password, firstname, lastname, address, phonenum, grade } = updatedData;
            const q = `UPDATE users SET email='${email}',
                        password='${password}',
                        firstname='${firstname}', 
                        lastname='${lastname}',
                        address='${address}',
                        phonenum='${phonenum}',
                        grade=${grade}
                        WHERE id='${userId}'`;
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

module.exports = { Student };