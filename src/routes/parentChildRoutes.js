const express = require('express');
const router = express.Router();

const parentChildController = require('../controllers/parentChildController');

router.post('/parentchild/connect', parentChildController.connect);
router.post('/parentchild/sever', parentChildController.sever);

module.exports = router;