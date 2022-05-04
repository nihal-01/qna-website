import mongoose from 'mongoose';
import nc from 'next-connect';

import { Question } from '../../models';
import { connectDb, isAuth } from '../../middlewares';

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
    const filters = {};
    const sort = {};

    // checking query and adding to sort variable
    if (req.query.sort && req.query.default !== 'default') {
        const parts = req.query.sort.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // cheking filters and adding to filter variable
    if (req.query.polls === 'true') {
        filters.isPoll = true;
    }

    if (req.query.noAnswers === 'true') {
        filters.numOfAnswers = 0;
    }

    if (req.query.user) {
        filters.author = mongoose.Types.ObjectId(req.query.user);
    }

    const aggregateQuery = [
        {
            $match: Object.keys(filters).includes('numOfAnswers')
                ? {}
                : filters,
        },
        {
            $lookup: {
                from: 'answers',
                localField: '_id',
                foreignField: 'questionId',
                as: 'answers',
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
            },
        },
        {
            $project: {
                _id: 1,
                numOfAnswers: { $size: '$answers' },
                category: { $arrayElemAt: ['$category', 0] },
                author: { $arrayElemAt: ['$author', 0] },
                title: 1,
                tags: 1,
                details: 1,
                isPoll: 1,
                isAnonymous: 1,
                likes: 1,
            },
        },
        {
            $match: Object.keys(filters).includes('numOfAnswers')
                ? filters
                : {},
        },
        {
            $project: {
                _id: 1,
                numOfAnswers: 1,
                category: 1,
                author: 1,
                title: 1,
                tags: 1,
                details: 1,
                isPoll: 1,
                isAnonymous: 1,
                likes: 1,
            },
        },
    ];

    if (Object.keys(sort).length !== 0) {
        aggregateQuery.push({ $sort: sort });
    }

    const questions = await Question.aggregate(aggregateQuery);

    res.status(200).json(questions);
});

handler.use(isAuth);

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

export default handler;
