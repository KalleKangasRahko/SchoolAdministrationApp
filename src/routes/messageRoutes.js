const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// All the routes here are '.../api/something'

router.get('/messages', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessagesByReceiver);
router.get('/messages/message/:messageid/user/:userid', messageController.getMessageById);
router.get('/messages/read/:id', messageController.markMessageAsRead);
router.post('/messages', messageController.saveMessage);
router.delete('/messages', messageController.removeMessage);

module.exports = router;