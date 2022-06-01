import nc from 'next-connect';

import { Answer, Question, User } from '../../models';
import { connectDb } from '../../middlewares';

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
    const noOfQuestions = await Question.find({}).count();
    const noOfAnswers = await Answer.find({}).count();
    const noOfUsers = await User.find({}).count();
    const noOfBestAnswers = await Answer.find({ votes: { $gte: 10 } }).count();

    const popularQuestions = await Question.find()
        .populate('author', '_id username avatar')
        .populate('numOfAnswers')
        .sort({ votes: -1 })
        .limit(3)
        .select('_id title numOfAnswers author')
        .lean();

    const answers = await Answer.find()
        .populate('author', '_id username avatar')
        .sort({ createdAt: -1 })
        .select('_id answer author createdAt')
        .limit(3);

    const topMembers = await User.find({})
        .populate('numOfQuestions')
        .populate('numOfAnswers')
        .sort({ createdAt: -1 })
        .limit(3)
        .select(
            '_id username avatar numOfQuestions numOfAnswers badge isVerified'
        )
        .lean();

    const trendingTags = await Question.aggregate([
        {
            $unwind: '$tags',
        },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
        {
            $project: {
                _id: 0,
                tag: '$_id',
                count: 1,
            },
        },
    ]);

    res.status(200).json({
        noOfQuestions,
        noOfAnswers,
        noOfBestAnswers,
        noOfUsers,
        popularQuestions,
        answers,
        topMembers,
        trendingTags,
    });
});

export default handler;
