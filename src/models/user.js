const db = require('../db');

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
            // This monster of a query allows us to get both the children of a parent and parents of a child with a single call
            const q = `SELECT u.id, u.role, u.firstname, u.lastname, u.email, u.address, u.phonenum, u.grade AS ownGrade,
                        pc2.parent AS parentId, pc1.child AS childId,
                        CONCAT(c.firstname, ' ', c.lastname) AS child, c.grade, 
                        CONCAT(p.firstname, ' ', p.lastname) AS parent
                        FROM users u left JOIN parents_children pc1 ON u.id = pc1.parent 
                        LEFT JOIN users c ON c.id = pc1.child 
                        LEFT JOIN parents_children pc2 ON u.id = pc2.child 
                        LEFT JOIN users p ON p.id = pc2.parent
                        WHERE u.id='${userId}'`;
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

    async remove() {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM users WHERE id='${this.id}'`;
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