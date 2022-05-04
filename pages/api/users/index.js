import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';
import { User } from '../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.get(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } })
        .populate('numOfQuestions')
        .populate('numOfAnswers')
        .select(
            'username avatar followers following numOfQuestions numOfAnswers'
        )
        .lean();
    users.forEach((user) => {
        user.followers = user?.followers?.length || 0;
        user.following = user?.following?.length || 0;
        user.isFollowing = req.user?.following?.includes(user._id);
    });
    return res.status(200).json(users);
});

export default handler;
