import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { Answer, Comment, Group, Post, Question } from '../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(isAuth, connectDb);

handler.delete(async (req, res) => {
    await req.user.remove();
    await Question.deleteMany({ author: req.user._id });
    await Answer.deleteMany({ author: req.user._id });
    await Group.deleteMany({ creator: req.user._id });
    await Post.deleteMany({ authorId: req.user._id });
    await Comment.deleteMany({ authorId: req.user._id });
    res.status(200).json({ message: 'successfull' });
});

export default handler;
