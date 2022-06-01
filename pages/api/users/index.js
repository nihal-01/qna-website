import nc from 'next-connect';

import { getMyUsers } from '../../../helpers/userHelpers';
import { isAuth } from '../../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(isAuth);

handler.get(async (req, res) => {
    const users = await getMyUsers(req.user);
    return res.status(200).json(users);
});

export default handler;
