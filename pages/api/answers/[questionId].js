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
    const { questionId } = req.query;

    const answers = await Answer.find({ questionId }).populate(
        'author',
        '_id username avatar isVerified badge'
    );

    res.status(200).json(answers);
});

export default handler;
