import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { Group } from '../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.post(async (req, res) => {
    const newGroup = new Group({
        ...req.body,
        creator: req.user._id,
        users: [req.user._id],
    });

    await newGroup.save();
    return res.status(201).json({ message: 'success' });
});

export default handler;
