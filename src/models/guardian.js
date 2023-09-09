const db = require('../db');
const { User } = require('./user.js');

// Guardian-methods
class Guardian extends User {
    constructor(id, email, password, role, firstname, lastname, address, phonenum) {
        super(id, email, password, role, firstname, lastname);
        this.address = address;
        this.phonenum = phonenum;
    }

    // Tested and works!
    static async create(userData) {
        return new Promise((resolve, reject) => {
            console.log('hiya from guardian');
            const { id, email, password, firstname, lastname, address, phonenum } = userData;
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            try {
                db.query(q, [id, email, password, 2, firstname, lastname, address, phonenum],
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
            const q = 'SELECT * FROM users WHERE role=2';
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
                })
            }
            catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    // Get guardians of a certain student
    static async getByStudent(studentId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM parents_children inner JOIN users ON parents_children.parent=users.id AND child='${studentId}'`;
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
            const { email, password, firstname, lastname, address, phonenum } = updatedData;
            const q = `UPDATE users SET email='${email}',
                        password='${password}',
                        firstname='${firstname}', 
                        lastname='${lastname}',
                        address='${address}',
                        phonenum='${phonenum}'
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

module.exports = { Guardian };