import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { Comment } from '../../../models';

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
    const newComment = new Comment({
        ...req.body,
        authorId: req.user._id,
    });
    await newComment.save();

    res.status(201).json(newComment);
});

export default handler;
