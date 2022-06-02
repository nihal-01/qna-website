import nc from 'next-connect';

import { Answer } from '../../../models';
import { connectDb, isAuth } from '../../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb);

handler.get(async (req, res) => {
    const { questionId, sortBy } = req.query;

    const sort = {};

    if (sortBy === 'voted') {
        sort.votes = -1;
    } else if (sortBy === 'recent') {
        sort.createdAt = -1;
    }

    const answers = await Answer.find({ questionId, isReply: { $ne: true } })
        .populate('author', '_id username avatar isVerified badge')
        .populate([
            {
                path: 'replies',
                model: 'Answer',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: 'username avatar badge isVerified',
                },
            },
        ])
        .sort(sort);

    res.status(200).json(answers);
});

export default handler;
