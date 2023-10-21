const db = require('../db');

class ParentChild {
    constructor (parent, child) {
        this.parent = parent;
        this.child = child;
    }

    // Connect a guardian and a student
    async create() {
        try {
            await db.connect();
            const q = `INSERT INTO parents_children (parent, child) VALUES ('${this.parent}', '${this.child}')`;
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

    // Remove a row from the table, though not the users themselves
    async remove() {
        try {
            await db.connect();
            const q = `DELETE FROM parents_children WHERE parent='${this.parent}' AND child='${this.child}'`;
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

module.exports = { ParentChild };