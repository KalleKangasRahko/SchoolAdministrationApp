const db = require('../db');
const { User } = require('./user.js');

// Admin-methods
class Admin extends User {
    constructor(id, email, password, role, firstname, lastname) {
        super(id, email, password, role, firstname, lastname);
    }

    // Tested and works!
    async create() {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)';
            try {
                db.query(q, [this.id, this.email, this.password, 0],
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
    async update() {
        return new Promise((resolve, reject) => {
            // The password is changed only if a new one is supplied
            // Otherwise the password simply be reset to empty and you'd have to supply the old password every time the user is edited
            let password;
            if (this.password !== '') {
                password = `, password='${this.password}'`
            }
            else {
                password = '';
            }
            const q = `UPDATE users SET email='${this.email}'
                        ${password}
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

module.exports = { Admin };