import { User } from '../models';
import { db } from '../utils';

export const getAllUsers = async () => {
    try {
        await db.connect();

        const users = await User.find()
            .populate('numOfQuestions')
            .populate('numOfAnswers')
            .select(
                'username avatar followers following numOfQuestions numOfAnswers'
            )
            .lean();
        users.forEach((user) => {
            user.followers = user?.followers?.length || 0;
            user.following = user?.following?.length || 0;
        });

        return users;
    } catch (err) {
        throw new Error(err);
    }
};

export const getMyUsers = async (myUser) => {
    try {
        await db.connect();

        const users = await User.find({ _id: { $ne: myUser._id } })
            .populate('numOfQuestions')
            .populate('numOfAnswers')
            .select(
                'username avatar followers following numOfQuestions numOfAnswers'
            )
            .lean();
        users.forEach((user) => {
            user.isFollowing = myUser?.following?.includes(user._id);
            user.followers = user?.followers?.length || 0;
            user.following = user?.following?.length || 0;
        });

        return users;
    } catch (err) {
        throw new Error(err);
    }
};

export const getSingleUser = async (id) => {
    try {
        await db.connect();
        return User.findOne({ _id: id });
    } catch (err) {
        throw new Error(err);
    }
};
