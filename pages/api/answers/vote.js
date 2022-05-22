import nc from 'next-connect';

import { Answer, Question } from '../../../models';
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
    const { isUpvote, answerId } = req.body;
    if (isUpvote === undefined || !answerId) {
        return res
            .status(400)
            .json({ error: 'answerId and isUpvote should be provided' });
    }

    const answer = await Answer.findById(answerId);

    if (!answer) {
        return res.status(400).json({ error: 'No answers found' });
    }

    if (isUpvote) {
        if (answer?.upvotes?.includes(req.user._id)) {
            return res.status(400).json({
                error: 'Sorry, you cannot vote on the same answer more than once',
            });
        }

        if (answer?.downvotes?.includes(req.user._id)) {
            const filteredDownvotes = answer.downvotes.filter((userId) => {
                userId.toString !== req.user._id;
            });
            answer.downvotes = filteredDownvotes;
            answer.upvotes?.push(req.user._id);
            answer.votes += 2;
            await answer.save();
        } else {
            answer.upvotes?.push(req.user._id);
            answer.votes += 1;
            await answer.save();
        }
    } else {
        if (answer?.downvotes?.includes(req.user._id)) {
            return res.status(400).json({
                error: 'Sorry, you cannot vote on the same answer more than once',
            });
        }

        if (answer?.upvotes?.includes(req.user._id)) {
            const filteredUpvotes = answer.upvotes.filter((userId) => {
                userId.toString !== req.user._id;
            });
            answer.upvotes = filteredUpvotes;
            answer.downvotes?.push(req.user._id);
            answer.votes -= 2;
            await answer.save();
        } else {
            answer.downvotes?.push(req.user._id);
            answer.votes -= 1;
            await answer.save();
        }
    }

    res.status(200).json({ votes: answer.votes });
});

export default handler;
