import mongoose from 'mongoose';
import { Question, User } from '../models';
import { db } from '../utils';

export const getAllQuestions = async (query) => {
    try {
        await db.connect();

        const filters = {};
        const sort = {};

        // checking query and adding to sort variable
        if (query.sort && query.default !== 'default') {
            const parts = query.sort.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        // cheking filters and adding to filter variable
        if (query.polls === 'true') {
            filters.isPoll = true;
        }

        if (query.noAnswers === 'true') {
            filters.numOfAnswers = 0;
        }

        if (query.user) {
            filters.author = mongoose.Types.ObjectId(query.user);
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
                    votes: 1,
                    createdAt: 1,
                    views: 1,
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
                    votes: 1,
                    createdAt: 1,
                    views: 1,
                },
            },
        ];

        if (Object.keys(sort).length !== 0) {
            aggregateQuery.push({ $sort: sort });
        }

        const questions = await Question.aggregate(aggregateQuery);

        return questions;
    } catch (err) {
        throw new Error(err);
    }
};

export const getSingleQuestion = async (id) => {
    try {
        await db.connect();

        const question = await Question.findById(id)
            .populate(
                'author',
                '_id username badge isVerified followers avatar'
            )
            .populate('category', '_id name')
            .lean();

        return question;
    } catch (err) {
        throw new Error(err);
    }
};

export const updateViews = async (questionId) => {
    try {
        await db.connect();

        const question = await Question.findById(questionId);
        if (question) {
            question.views += 1;
            await question.save();
        }

        return question;
    } catch (err) {
        throw new Error(err);
    }
};

export const getMyFeed = async (id) => {
    try {
        await db.connect();

        const user = await User.findById(id);
        if (!user) {
            return [];
        }

        const questions = await Question.find({
            author: { $in: user?.following },
        })
            .populate(
                'author',
                '_id username badge isVerified followers avatar'
            )
            .populate('category', '_id name')
            .sort({ createdAt: -1 })
            .lean();

        return questions;
    } catch (err) {
        throw new Error(err);
    }
};

export const checkIsFavourited = async (userId, questionId) => {
    const user = await User.findById(userId);
    if (!user || !user.favourites) {
        return false;
    }

    return user.favourites.includes(questionId);
};

export const getUserQuestions = async (userId) => {
    try {
        await db.connect();

        const questions = await Question.find({ author: userId })
            .populate(
                'author',
                '_id username badge isVerified followers avatar'
            )
            .populate('category', '_id name')
            .lean();

        return questions;
    } catch (err) {
        throw new Error(err);
    }
};

export const getUserPolls = async (userId) => {
    try {
        await db.connect();

        const polls = await Question.find({
            author: userId,
            isPoll: true,
        })
            .populate(
                'author',
                '_id username badge isVerified followers avatar'
            )
            .populate('category', '_id name')
            .lean();

        return polls;
    } catch (err) {
        throw new Error(err);
    }
};

export const getAllTags = async () => {
    try {
        await db.connect();

        return await Question.distinct('tags');
    } catch (err) {
        throw new Error(err);
    }
};
