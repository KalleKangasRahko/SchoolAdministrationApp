const db = require('../db');

class ParentChild {
    constructor (parent, child) {
        this.parent = parent;
        this.child = child;
    }

    // Connect a guardian and a student
    async create() {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO parents_children (parent, child) VALUES (?, ?)';
            try {
                db.query(q, [this.parent, this.child],
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

    // Remove a row from the table, though not the users themselves
    async remove() {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM parents_children WHERE parent='${this.parent}' AND child='${this.child}'`;
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
        })
    }
}

module.exports = { ParentChild };