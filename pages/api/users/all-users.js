import nc from 'next-connect';
import { getAllUsers } from '../../../helpers/userHelpers';

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

// All users without authentication
handler.get(async (req, res) => {
    const users = await getAllUsers();
    return res.status(200).json(users);
});

export default handler;
