import validator from 'validator';
import bcrypt from 'bcrypt';

import { User } from '../../../models';
import { db } from '../../../utils';
import { signToken } from '../../../utils/auth';

export default async function handler(req, res) {
    await db.connect();

    if (req.method === 'POST') {
        try {
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
                token,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
