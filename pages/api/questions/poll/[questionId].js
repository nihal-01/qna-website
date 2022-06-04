import nc from 'next-connect';

import { Question } from '../../../../models';
import { connectDb, isAuth } from '../../../../middlewares';

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
    const { questionId } = req.query;
    const question = await Question.findById(questionId);

    if (!question) {
        return res.status(400).json({ error: 'Question not found!' });
    }

    question.poll.map((myPoll) => {
        if (myPoll.option === req.body?.option) {
            myPoll.votes += 1;
        }
        return myPoll;
    });

    question.polledUsers
        ? question.polledUsers.push(req.user._id)
        : (question.polledUsers = [req.user._id]);

    await question.save();

    res.status(200).json({ message: 'Your poll submitted successfully' });
});

export default handler;
