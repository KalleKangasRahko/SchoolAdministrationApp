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
    async create() {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM, GRADE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            try {
                db.query(q, [this.id, this.email, this.password, 3, this.firstname, this.lastname, this.address, this.phonenum, this.grade],
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

    static async getStudentsForGuardian() {
        return new Promise((resolve, reject) => {
            // Another monster-query, which gets us all the students and the ids of their guardians
            const q = `SELECT u.id, CONCAT(u.firstname, ' ', u.lastname) AS name, u.grade, pc2.parent AS parentId
            FROM users u left JOIN parents_children pc1 ON u.id = pc1.parent 
            LEFT JOIN users c ON c.id = pc1.child 
            LEFT JOIN parents_children pc2 ON u.id = pc2.child 
            LEFT JOIN users p ON p.id = pc2.parent
            WHERE u.role = 3`
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
    async update() {
        return new Promise((resolve, reject) => {
            // The password is changed only if a new one is supplied
            let password;
            if (this.password !== '') {
                password = `password='${this.password}',`
            }
            else {
                password = '';
            }
            const q = `UPDATE users SET email='${this.email}',
                        ${password}
                        firstname='${this.firstname}', 
                        lastname='${this.lastname}',
                        address='${this.address}',
                        phonenum='${this.phonenum}',
                        grade=${this.grade}
                        WHERE id='${this.id}'`;
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