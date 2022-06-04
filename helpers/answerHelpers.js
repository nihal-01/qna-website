import { Answer } from '../models';
import { db } from '../utils';

export const getAllAnswers = async () => {
    try {
        await db.connect();

        const answers = await Answer.find({})
            .populate('author', 'username avatar isVerified badge')
            .populate('questionId', 'title')
            .sort({ createdAt: -1 });

        return answers;
    } catch (err) {
        throw new Error(err);
    }
};

export const getNumberOfAnswers = async (questionId) => {
    try {
        await db.connect();

        const numOfAnswers = await Answer.find({ questionId }).count();
        return numOfAnswers;
    } catch (err) {
        throw new Error(err);
    }
};

export const getSingleAnswer = async (answerId) => {
    try {
        await db.connect();
        const answer = await Answer.findById(answerId);
        return answer;
    } catch (err) {
        throw new Error(err);
    }
};

export const getUserAnswers = async (userId) => {
    try {
        await db.connect();
        const answer = await Answer.find({ author: userId })
            .populate('author', 'username avatar isVerified badge')
            .populate('questionId', 'title')
            .sort({ createdAt: -1 });
        return answer;
    } catch (err) {
        throw new Error(err);
    }
};
