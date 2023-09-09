const express = require('express');
const router = express.Router();
const dashboard = require('../../views/guardian/dashboard');

router.get('/', async (req, res) => {
    res.send(dashboard({ req }));
});

module.exports = router;