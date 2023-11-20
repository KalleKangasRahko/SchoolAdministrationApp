const express = require('express');
const router = express.Router();
const axios = require('axios');

const inboxPage = require('../../views/inbox/inbox');
const readMessagePage = require('../../views/inbox/readMessage');
const composePage = require('../../views/inbox/compose');

// Inbox of the current user
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/messages/${id}`);
    const messages = result.data.response;
    console.log(messages);

    res.send(inboxPage({ req, messages }));
});

// Individual message
router.get('/message/:id', async (req, res) => {
    const id = req.params.id;
    const userId = req.session.user.id;
    const result = await axios.get(`http://localhost:3000/api/messages/message/${id}/user/${userId}`);
    const message = result.data.response[0];
    console.log(message);

    // If the message has not been read before, mark it as read
    if (!message.opened) {
        console.log('Reading for the first time!');
        const read = await axios.get(`http://localhost:3000/api/messages/read/${message.mrId}`);
        console.log(read);
    }

    console.log(message);

    res.send(readMessagePage({ req, message }));
});

// Show all the messages in a thread
router.get('/thread/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/messages/thread/${id}`);
    const messages = result.data.response;

    for (let message of messages) {
        if (!message.opened && message.senderId !== req.session.user.id) {
            console.log('Reading for the first time!');
            const read = await axios.get(`http://localhost:3000/api/messages/read/${message.mrId}`);
            console.log(read);
        }
    }
    res.send(readMessagePage({ req, messages }));
});

// Write a new message
router.get('/compose', async (req, res) => {
    const result = await axios.get('http://localhost:3000/api/users');
    const users = result.data.response;
    res.send(composePage({ req, users }));
});

router.post('/compose', async (req, res) => {
    try {
        console.log(req.body);
        const { senderId, receivers, title, content, thread } = req.body;
        let message;

        // Have to make sure there is an array of receivers, even if there is just one item in it
        if (!(receivers instanceof Array)) {
            console.log('Just one receiver...');
            const receiversArray = [receivers];
            message = {
                senderId,
                receivers: receiversArray,
                title,
                content,
                thread
            };
        }
        else {
            message = {
                senderId,
                receivers,
                title,
                content,
                thread
            };
        }
        console.log(message);
        await axios.post('http://localhost:3000/api/messages', message);
        res.redirect(`/inbox/user/${req.session.user.id}`)
    }
    catch (error) {
        res.redirect(`/inbox/user/${req.session.user.id}`)
    }
});

module.exports = router;