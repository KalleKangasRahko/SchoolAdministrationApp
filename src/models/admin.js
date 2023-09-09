const db = require('../db');
const { User } = require('./user.js');

// Admin-methods
class Admin extends User {
    constructor(id, email, password, role, firstname, lastname) {
        super(id, email, password, role, firstname, lastname);
    }

    // Tested and works!
    static async create(userData) {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)';
            try {
                db.query(q, [userData.id, userData.email, userData.password, 0],
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
            const q = 'SELECT * FROM users WHERE role=0';
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
            const q = `UPDATE users SET email='${updatedData.email}',
                        password='${updatedData.password}'
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

module.exports = { Admin };