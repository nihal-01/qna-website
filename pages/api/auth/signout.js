import nc from 'next-connect';

import { connectDb, isAuth } from '../../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.post(async (req, res) => {
    req.user.token = undefined;
    await req.user.save();
    return res.status(200).json({ message: 'logged out successfully' });
});

export default handler;
