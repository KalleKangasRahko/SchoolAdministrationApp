const express = require('express');
const router = express.Router();

const parentChildController = require('../../controllers/parentChildController');

router.post('/parentchild/', parentChildController.createParentChild);
router.post('/parentchild/sever', parentChildController.removeParentChild);

module.exports = router;