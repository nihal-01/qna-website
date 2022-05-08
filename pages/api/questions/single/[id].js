import mongoose from 'mongoose';
import nc from 'next-connect';

import { Answer, Question } from '../../../../models';
import { connectDb, isAuth } from '../../../../middlewares';

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
    const { id } = req.query;
    const question = await Question.findById(id)
        .populate('author', '_id username badge isVerified followers avatar')
        .populate('category', '_id name')
        .lean();

    const numOfAnswers = await Answer.find({ questionId: id }).count();
    res.status(200).json({ ...question, numOfAnswers });
});

export default handler;
