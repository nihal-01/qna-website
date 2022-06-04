import nc from 'next-connect';
import bcrypt from 'bcrypt';

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
    if (!req.body.password) {
        return res.status(400).json({ error: 'Password should be provided' });
    }

    await User.findByIdAndUpdate(req.user._id, {
        password: bcrypt.hashSync(req.body?.password, 8),
    });

    res.status(200).json({ message: 'Success' });
});

export default handler;
