const db = require('../db');
const { User } = require('./user.js');

// Teacher-methods
class Teacher extends User {
    constructor(id, email, password, role, firstname, lastname, address, phonenum, grade) {
        super(id, email, password, role, firstname, lastname);
        this.address = address;
        this.phonenum = phonenum;
        this.grade = grade;
    }

    async create() {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM, GRADE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            try {
                db.query(q, [this.id, this.email, this.password, 1, this.firstname, this.lastname, this.address, this.phonenum, this.grade],
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

    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = 'SELECT * FROM users WHERE role=1';
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

    async update() {
        return new Promise((resolve, reject) => {
            //const { email, password, firstname, lastname, address, phonenum, grade } = updatedData;
            // The password is changed only if a new one is supplied
            // Otherwise the password simply be reset to empty and you'd have to supply the old password every time the user is edited
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

module.exports = { Teacher };