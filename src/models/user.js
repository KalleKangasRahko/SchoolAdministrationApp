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
                await db.connect();
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
    // Get a user by e-mail address. Used in the login.
    static async getByEmail(email) {
        try {
            await db.connect();
            const q = `SELECT * FROM users WHERE email='${email}'`;
            const result = await db.query(q);
            console.log(result[0]);
            return result[0];
        }
        catch (error) {
            console.log(error);
        }
        finally {
            db.close();
        }
    }

    // Tested and works!
    // Get all the different kinds of users in the db
    static async getAll() {
        try { 
            await db.connect();
            const q = 'SELECT * FROM users';
            const result = await db.query(q);
            //console.log(result);
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
    async remove() {
        try {
            await db.connect();
            const q = `DELETE FROM users WHERE id='${this.id}'`;
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

module.exports = { User };