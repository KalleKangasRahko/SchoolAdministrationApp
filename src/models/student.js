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
        try {
            await db.connect();
            const q = `INSERT INTO users (ID, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, ADDRESS, PHONENUM, GRADE) 
                        VALUES ('${this.id}', '${this.email}', '${this.password}', 3, '${this.firstname}', '${this.lastname}', 
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
            const q = 'SELECT * FROM users WHERE role=3';
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

    static async getStudentsForGuardian() {
        try {
            await db.connect();
            // Another monster-query, which gets us all the students and the ids of their guardians
            const q = `SELECT u.id, CONCAT(u.firstname, ' ', u.lastname) AS name, u.grade, pc2.parent AS parentId
            FROM users u left JOIN parents_children pc1 ON u.id = pc1.parent 
            LEFT JOIN users c ON c.id = pc1.child 
            LEFT JOIN parents_children pc2 ON u.id = pc2.child 
            LEFT JOIN users p ON p.id = pc2.parent
            WHERE u.role = 3`;
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

    static async getByGrade(grade) {
        try {
            await db.connect();
            const q = `SELECT * FROM users WHERE role=3 AND grade=${grade}`;
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

module.exports = { Student };