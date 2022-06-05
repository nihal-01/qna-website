import { Comment, Group, Post } from '../models';
import { db } from '../utils';

export const getAllGroups = async () => {
    try {
        await db.connect();

        const groups = await Group.find({})
            .populate('numOfPosts')
            .sort({ createdAt: -1 })
            .lean();

        return groups;
    } catch (err) {
        throw new Error(err);
    }
};

export const getSingleGroup = async (groupId) => {
    try {
        await db.connect();

        const group = await Group.findOne({ _id: groupId })
            .populate('numOfPosts')
            .sort({ createdAt: -1 })
            .lean();

        return group;
    } catch (err) {
        throw new Error(err);
    }
};

export const getGroupPosts = async (groupId) => {
    try {
        await db.connect();

        const posts = await Post.find({ groupId })
            .populate('authorId', 'avatar username isVerified badge')
            .populate('numOfComments')
            .sort({ createdAt: -1 })
            .lean();

        return posts;
    } catch (err) {
        throw new Error(err);
    }
};

export const getSingleGroupPost = async (postId) => {
    try {
        await db.connect();

        const post = await Post.findOne({ _id: postId })
            .populate('authorId', 'avatar username isVerified badge')
            .populate('numOfComments')
            .lean();

        return post;
    } catch (err) {
        throw new Error(err);
    }
};

export const getGroupPostComments = async (postId) => {
    try {
        await db.connect();

        const comments = await Comment.find({
            postId: postId,
        }).populate('authorId');

        return comments;
    } catch (err) {
        throw new Error(err);
    }
};
