import nc from 'next-connect';

import { connectDb, isAuth } from '../../../../middlewares';
import { Post } from '../../../../models';

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
    const { postId } = req.query;
    await Post.findByIdAndRemove(postId);

    res.status(200).json({ message: 'deleted' });
});

export default handler;
