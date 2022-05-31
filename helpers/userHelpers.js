const { User } = require('../models');

module.exports = {
    getAllUsers: async () => {
        try {
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
    },

    getMyUsers: async (myUser) => {
        try {
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
    },
};
