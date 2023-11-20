const { Message } = require('./../models/message');
const crypto = require('crypto');

const messageController = {
    async saveMessage(req, res) {
        try {
            const { title, content, senderId, receivers, thread } = req.body;
            // If this is the first message in a thread, create an id for the thread
            // We create an array of threads (thread per receiver) so that same message being sent to
            // several different receivers creates a separate thread for each receiver.
            let threads = [];
            if (!thread) {
                for (let i = 0; i < receivers.length; i++) {
                    const threadId = crypto.randomBytes(4).toString('hex');
                    threads.push(threadId);
                }
            }
            else {
                threads = [thread];
            }
            const messageId = crypto.randomBytes(4).toString('hex');
            // These four are needed for an instance of Message
            const message = new Message(messageId, title, content, senderId);
            // These two are needed for the messages_receivers-table
            const result = await message.save(receivers, threads);
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

    async getMessageByThreadId(req, res) {
        try {
            const result = await Message.getByThreadId(req.params.id);
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