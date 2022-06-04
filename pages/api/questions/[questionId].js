import nc from 'next-connect';

import { Answer, Question } from '../../../models';
import { connectDb, isAuth } from '../../../middlewares';
import { getAllQuestions } from '../../../helpers/questionsHelpers';

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
    const { title, category, tags, details, poll, isAnonymous, notifyEmail } =
        req.body;

    const question = await Question.findOneAndUpdate(
        { _id: questionId, author: req.user._id },
        {
            title,
            category,
            tags,
            details,
            poll,
            isPoll: poll ? (poll.length > 0 ? true : false) : false,
            isAnonymous,
            notifyEmail,
        },
        { new: true }
    )
        .populate('author', '_id username badge isVerified followers avatar')
        .populate('category', '_id name')
        .lean();

    if (!question) {
        return res
            .status(400)
            .json({ error: 'Something went wrong, Try again' });
    }

    res.status(201).json(question);
});

handler.delete(async (req, res) => {
    const { questionId } = req.query;
    await Question.findOneAndDelete({ _id: questionId, author: req.user._id });
    res.status(200).json({ message: 'deleted successfully' });
});

export default handler;
