const express = require('express');
const router = express.Router();

const parentChildController = require('../controllers/parentChildController');

router.post('/parentchild/', parentChildController.create);
router.post('/parentchild/sever', parentChildController.remove);

module.exports = router;