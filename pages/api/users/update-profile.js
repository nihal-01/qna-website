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

handler.use(isAuth, connectDb);

handler.patch(async (req, res) => {
    if (req.body.username !== req.user.username) {
        const excistUser = await User.findOne({ username: req.body.username });

        if (excistUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
    }

    if (req.body.email !== req.user.email) {
        const excistUser = await User.findOne({ email: req.body.email });

        if (excistUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...req.body },
        { new: true, runValidators: true }
    ).select('_id username email avatar coverPhoto token');

    res.status(200).json(user);
});

export default handler;
