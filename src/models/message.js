const db = require('../db');

class Message {
    constructor(id, title, content, senderId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.senderId = senderId;
    }

    async save(receivers) {
        try {
            await db.connect();
            const receiverStatements = receivers.map(receiver => {
                return `INSERT INTO messages_receivers (MESSAGEID, RECEIVERID, OPENED) VALUES ('${this.id}', '${receiver}', 0);`;
            }).join(' ');
            const q = `INSERT INTO messages (ID, TITLE, CONTENT, SENDERID) VALUES ('${this.id}', '${this.title}', '${this.content}', '${this.senderId}'); ${receiverStatements}`;
            console.log(q);
            const result = await db.query(q);
            return result;
        }
        catch (error) {
            console.log(error);
            return error;
        }
        finally {
            db.close();
        }
    }

    static async getByReceiver(receiverId) {
        try {
            await db.connect();
            const q = `SELECT mr.id as mrId, m.id, m.title, m.senderId, CONCAT(u.firstname, ' ', u.lastname) AS sender, 
                        m.timeAndDate, mr.opened FROM messages m 
                        LEFT JOIN messages_receivers mr ON m.id = mr.messageId 
                        LEFT JOIN users u ON m.senderId = u.id WHERE mr.receiverId='${receiverId}'`;
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

    static async getById(messageId, readerId) {
        try {
            await db.connect();
            const q = `SELECT mr.id AS mrId, m.title, m.content, CONCAT (u.firstname, ' ', u.lastname) AS sender, m.senderId, mr.opened
                        FROM messages m LEFT JOIN messages_receivers mr ON m.id = messageId 
                        LEFT JOIN users u ON m.senderId = u.id WHERE m.id='${messageId}' AND mr.receiverId='${readerId}'`;
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

    static async getAll() {
        try {
            await db.connect();
            const q = `SELECT * FROM messages`;
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

    static async markAsRead(messageId) {
        try {
            await db.connect();
            const q = `UPDATE messages_receivers SET opened=1 WHERE id=${messageId}`;
            console.log(q);
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

    async remove() {
        try {
            await db.connect();
            const q = `DELETE FROM messages WHERE id='${this.id}'`;
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

module.exports = { Message };