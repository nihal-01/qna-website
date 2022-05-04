import nc from 'next-connect';

import { connectDb } from '../../../middlewares';
import { User } from '../../../models';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb);

// All users without authentication
handler.get(async (req, res) => {
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
    return res.status(200).json(users);
});

export default handler;
