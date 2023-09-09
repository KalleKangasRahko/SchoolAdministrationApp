const db = require('../db');
const { use } = require('../routes/userRoutes');

class User {
    constructor(id, email, password, role, firstname, lastname) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // Tested and works!
    // Get, by id, a user out of all the different users in the db
    static async getById(userId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM users WHERE id='${userId}'`;
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

    static async getByEmail(email) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM users WHERE email='${email}'`;
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        resolve(result[0]);
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
    // Get all the different kinds of users in the db
    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM users`;
            try {
                db.query(q, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
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

    static async remove(userId) {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM users WHERE id='${userId}'`;
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
}

module.exports = { User };