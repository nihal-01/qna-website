import nc from 'next-connect';

import { connectDb, isAuth } from '../../../../middlewares';
import { Group, Post } from '../../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.patch(async (req, res) => {
    const { groupId } = req.query;
    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(400).json({ error: 'Group not found' });
    }

    const filteredUsers = group.users.filter((user) => {
        return user.toString() !== req.user._id.toString();
    });

    group.users = filteredUsers;
    await group.save();

    res.status(200).json({ message: 'leaved' });
});

export default handler;
