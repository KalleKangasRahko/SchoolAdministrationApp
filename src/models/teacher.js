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

    // Tested and works!
    async create() {
        try {
            await db.connect();
            const q = `INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM, GRADE) 
                        VALUES ('${this.id}', '${this.email}', '${this.password}', 1, '${this.firstname}', '${this.lastname}', 
                        '${this.address}', '${this.phonenum}', ${this.grade})`;
            const result = await db.query(q);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            db.close();
        }
    }

    // Tested and works!
    static async getAll() {
        try {
            await db.connect();
            const q = 'SELECT * FROM users WHERE role=1';
            const result = await db.query(q);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            db.close();
        }
    }

    // Tested and works!
    async update() {
        // The password is changed only if a new one is supplied
        // Otherwise the password simply be reset to empty and you'd have to supply the old password every time the user is edited
        let password;
        if (this.password !== '') {
            password = `password='${this.password}',`
        }
        else {
            password = '';
        }
        try {
            await db.connect();
            const q = `UPDATE users SET email='${this.email}',
                            ${password}
                            firstname='${this.firstname}', 
                            lastname='${this.lastname}',
                            address='${this.address}',
                            phonenum='${this.phonenum}',
                            grade=${this.grade}
                            WHERE id='${this.id}'`;
            const result = await db.query(q);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            db.close();
        }
    }
}

module.exports = { Teacher };