import nc from 'next-connect';

import { Question } from '../../../models';
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

handler.get(async (req, res) => {
    const questions = await getAllQuestions(req.query);
    res.status(200).json(questions);
});

handler.use(connectDb, isAuth);

handler.post(async (req, res) => {
    const { title, category, tags, details, poll, isAnonymous, notifyEmail } =
        req.body;
    const newQuestion = await Question({
        title,
        category,
        tags,
        details,
        poll,
        isPoll: poll ? (poll.length > 0 ? true : false) : false,
        isAnonymous,
        notifyEmail,
        author: req.user._id,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
});

handler.delete(async (req, res) => {
    const { questionId } = req.body;
    await Question.findByIdAndDelete(questionId);
    res.status(200).json({ message: 'deleted successfully' });
});

export default handler;
