import validator from 'validator';
import bcrypt from 'bcrypt';
import nc from 'next-connect';

import { User } from '../../../models';
import { signToken } from '../../../utils';
import { connectDb } from '../../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb);

handler.post(async (req, res) => {
    console.log('hi from signin');
    const { info, password } = req.body;
    let user;

    if (!info || !password) {
        return res.status(400).json({
            error: 'Username or email and password should be provided',
        });
    }

    if (validator.isEmail(info)) {
        user = await User.findOne({ email: info });
    } else {
        user = await User.findOne({ username: info });
    }

    if (!user) {
        return res
            .status(404)
            .json({ error: 'No user found with above credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(404)
            .json({ error: 'No user found with above credentials' });
    }

    const token = await signToken(user);

    user.token = token;
    await user.save();

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user?.avatar,
        coverPhoto: user?.coverPhoto,
        badge: user?.badge,
        token,
    });
});

export default handler;
