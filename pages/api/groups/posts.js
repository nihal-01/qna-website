import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { Post } from '../../../models';

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
    const newPost = new Post({
        ...req.body,
        authorId: req.user._id,
    });

    await newPost.save();
    return res.status(201).json(newPost);
});

export default handler;
