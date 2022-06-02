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
    const { answer, questionId, answerId } = req.body;
    const myAnswer = await Answer.findById(answerId);

    if (!myAnswer) {
        return res.status(400).json({ error: 'Answer not found!' });
    }

    const newReplay = new Answer({
        answer,
        questionId,
        author: req.user._id,
        isReply: true,
    });
    await newReplay.save();

    myAnswer.replies
        ? myAnswer.replies.push(newReplay._id)
        : (myAnswer.replies = [newReplay._id]);
    await myAnswer.save();

    res.status(200).json(newReplay);
});

export default handler;
