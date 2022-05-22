import mongoose from 'mongoose';
import nc from 'next-connect';

import { Question } from '../../../models';
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

handler.patch(async (req, res) => {
    const { isUpvote, questionId } = req.body;
    if (isUpvote === undefined || !questionId) {
        return res
            .status(400)
            .json({ error: 'questionId and isUpvote should be provided' });
    }

    const question = await Question.findById(questionId);

    if (!question) {
        return res.status(400).json({ error: 'No questions found' });
    }

    if (isUpvote) {
        if (question?.upvotes?.includes(req.user._id)) {
            return res.status(400).json({
                error: 'Sorry, you cannot vote on the same question more than once',
            });
        }

        if (question?.downvotes?.includes(req.user._id)) {
            const filteredDownvotes = question.downvotes.filter((userId) => {
                userId.toString !== req.user._id;
            });
            question.downvotes = filteredDownvotes;
            question.upvotes.push(req.user._id);
            question.votes += 2;
            await question.save();
        } else {
            question.upvotes.push(req.user._id);
            question.votes += 1;
            await question.save();
        }
    } else {
        if (question?.downvotes?.includes(req.user._id)) {
            return res.status(400).json({
                error: 'Sorry, you cannot vote on the same question more than once',
            });
        }

        if (question?.upvotes?.includes(req.user._id)) {
            const filteredUpvotes = question.upvotes.filter((userId) => {
                userId.toString !== req.user._id;
            });
            question.upvotes = filteredUpvotes;
            question.downvotes.push(req.user._id);
            question.votes -= 2;
            await question.save();
        } else {
            question.downvotes.push(req.user._id);
            question.votes -= 1;
            await question.save();
        }
    }

    res.status(200).json({ votes: question.votes });
});

export default handler;
