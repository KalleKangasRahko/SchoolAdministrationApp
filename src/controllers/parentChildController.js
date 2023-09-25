const { ParentChild } = require('../models/parentChild');

const parentChildController = {
    async create(req, res) {
        try {
            const { parentId, childId } = req.body;
            const parentChild = new ParentChild(parentId, childId);
            const result = await parentChild.create();
            res.status(201).json({ status: "OK", msg: "Users connected", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    },

    async remove(req, res) {
        try {
            const { parentId, childId } = req.body;
            const parentChild = new ParentChild(parentId, childId);
            const result = await parentChild.remove();
            res.status(201).json({ status: "OK", msg: "Users severed", response: result });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = parentChildController;