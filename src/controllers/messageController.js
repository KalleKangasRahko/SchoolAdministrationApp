const { Message } = require('./../models/message');
const crypto = require('crypto');

const messageController = {
    async saveMessage(req, res) {
        try {
            const { title, content, senderId, receivers } = req.body;
            const messageId = crypto.randomBytes(4).toString('hex');;
            const message = new Message(messageId, title, content, senderId);
            const result = await message.save(receivers);
            res.status(201).json({ status: "OK", msg: "Message saved", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getMessagesByReceiver(req, res) {
        try {
            const result = await Message.getByReceiver(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getMessageById(req, res) {
        try {
            const result = await Message.getById(req.params.messageid, req.params.userid);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async getAllMessages(req, res) {
        try {
            const result = await Message.getAll();
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async markMessageAsRead(req, res) {
        try {
            const result = await Message.markAsRead(req.params.id);
            res.json({ status: "OK", msg: "", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async removeMessage(req, res) {
        try {
            console.log('Removing message ' + req.params.id);
            const message = new Message(req.params.id);
            console.log(message);

            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }

            const result = message.remove();

            res.status(201).json({ status: "OK", msg: "Message removed", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = messageController;