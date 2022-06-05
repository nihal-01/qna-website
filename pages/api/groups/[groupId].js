import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { Group, Post } from '../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.delete(async (req, res) => {
    const { groupId } = req.query;
    await Group.findByIdAndRemove(groupId);
    await Post.deleteMany({ groupId: groupId });

    res.status(200).json({ message: 'group deleted successfully' });
});

// handler.patch(async (req, res) => {

// })

export default handler;
