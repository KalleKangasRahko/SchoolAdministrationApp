const express = require('express');
const router = express.Router();
const axios = require('axios');
const profilePage = require('../../views/profiles/profile');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user = result.data.response.map((item) => {
        return item;
    });
    res.send(profilePage({ req, user }));
});

module.exports = router;