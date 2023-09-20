const { parentChild } = require('../models/parentChild');

const parentChildController = {
    async connect(req, res) {
        try {
            const { parentId, childId } = req.body;
            const result = await parentChild.create(parentId, childId);
            res.status(201).json({ status: "OK", msg: "Users connected", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async sever(req, res) {
        try {
            console.log('hiyay!');
            const { parentId, childId } = req.body;
            console.log(parentId);
            console.log(childId);
            const result = await parentChild.remove(parentId, childId);
            res.status(201).json({ status: "OK", msg: "Users severed", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = parentChildController;