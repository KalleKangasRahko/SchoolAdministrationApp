const db = require('../db');

class parentChild {
    constructor (parent, child) {
        this.parent = parent;
        this.child = child;
    }

    // Connect a guardian and a student
    static async create(parentId, childId) {
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO parents_children (parent, child) VALUES (?, ?)';
            try {
                db.query(q, [parentId, childId],
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
    static async remove(parentId, childId) {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM parents_children WHERE parent='${parentId}' AND child='${childId}'`;
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

module.exports = { parentChild };