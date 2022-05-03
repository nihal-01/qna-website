import jwt from 'jsonwebtoken';

import { User } from '../models';

const isAuth = async (req, res, next) => {
    try {
        if (
            req.headers.authorization === undefined ||
            req.headers.authorization.split(' ')[1] === 'undefined'
        ) {
            return res.status(401).json({ error: 'Token must be provided' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

export default isAuth;
