import nc from 'next-connect';

import { connectDb, isAuth } from '../../../../middlewares';
import { User } from '../../../../models';

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
    const { id } = req.query;
    const user = await User.findOne({ _id: id });

    if (!user) {
        return res
            .status(400)
            .json({ error: `No user found with this(${id}) id` });
    }

    if (user?.followers?.includes(req.user._id)) {
        return res
            .status(400)
            .json({ error: `You already following ${user.username}` });
    }

    user.followers.unshift(req.user._id);
    await user.save();

    if (req.user?.following?.includes(id)) {
        return res
            .status(400)
            .json({ error: `You already following ${user.username}` });
    }

    req.user.following.unshift(id);
    await req.user.save();

    res.status(200).json({ message: 'successfull' });
});

export default handler;
