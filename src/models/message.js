const db = require('../db');

class Message {
    constructor(id, title, content, senderId, thread) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.senderId = senderId;
    }

    // Saving the message itself
    async save(receivers, threads) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO messages (ID, TITLE, CONTENT, SENDERID) VALUES (?, ?, ?, ?);`;
            console.log(q);

            try {
                db.query(q, [this.id, this.title, this.content, this.senderId],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        else {
                            console.log(result);
                            for (let i = 0; i < receivers.length; i++) {
                                this.saveReceiver(receivers[i], threads[i]);
                            }
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

    // Saving the receivers as well as the thread id
    async saveReceiver(receiver, thread) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO messages_receivers (MESSAGEID, RECEIVERID, THREAD, OPENED) VALUES (?, ?, ?, 0);`;
            console.log(q);
            try {
                db.query(q, [this.id, receiver, thread, 0],
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

    // Get the messages for a given user
    static async getByReceiver(receiverId) {
        return new Promise((resolve, reject) => {
            // What this should do is to get ALL the messages in EVERY thread that the user is involved in
            // then just remove all but the last message in each thread, and make a list of those
            const q = `SELECT mr.id as mrId, m.id, m.title, m.senderId, CONCAT(u.firstname, ' ', u.lastname) AS sender, 
                    m.timeAndDate, mr.thread, mr.opened FROM messages m 
                    LEFT JOIN messages_receivers mr ON m.id = mr.messageId 
                    LEFT JOIN users u ON m.senderId = u.id WHERE mr.receiverId='${receiverId}' OR m.senderId='${receiverId}'
                    ORDER BY timeAndDate`;
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

    // Get the individual message, speficially the one meant to the current user
    static async getById(messageId, readerId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT mr.id AS mrId, m.title, m.content, CONCAT (u.firstname, ' ', u.lastname) AS sender, m.senderId, mr.thread, mr.opened
                        FROM messages m LEFT JOIN messages_receivers mr ON m.id = messageId 
                        LEFT JOIN users u ON m.senderId = u.id WHERE m.id='${messageId}' AND mr.receiverId='${readerId}'`;
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

    // Get all the messages in a thread
    static async getByThreadId(threadId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT mr.id as mrId, m.id, m.title, m.content, m.senderId, CONCAT(u.firstname, ' ', u.lastname) AS sender, 
                        m.timeAndDate, mr.opened, mr.thread, mr.receiverId FROM messages m 
                        LEFT JOIN messages_receivers mr ON m.id = mr.messageId 
                        LEFT JOIN users u ON m.senderId = u.id WHERE mr.thread='${threadId}'
                        ORDER BY m.timeAndDate`;
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

    static async getAll() {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM messages`;
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

    static async markAsRead(messageId) {
        return new Promise((resolve, reject) => {
            const q = `UPDATE messages_receivers SET opened=1 WHERE id=${messageId}`;
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

    async remove() {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM messages WHERE id='${this.id}'`;
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

module.exports = { Message };