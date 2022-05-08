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

handler.use(connectDb, isAuth);

handler.post(async (req, res) => {
    const { answer, questionId } = req.body;
    const newAnswer = await Answer({
        answer,
        questionId,
        author: req.user._id,
    });

    await newAnswer.save();
    res.status(201).json(newAnswer);
});

export default handler;
