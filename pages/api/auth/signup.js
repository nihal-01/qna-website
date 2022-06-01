import bcrypt from 'bcrypt';

// import { db } from '../../../utils';
import { User } from '../../../models';
import { signToken } from '../../../utils/auth';

export default async function handler(req, res) {
    // await db.connect();

    if (req.method === 'POST') {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({
                    error: 'Username, email, password should be provided',
                });
            }

            const userByUname = await User.findOne({ username });
            if (userByUname) {
                return res.status(400).json({
                    error: 'Username already exists',
                });
            }

            const userByEmail = await User.findOne({ email });
            if (userByEmail) {
                return res.status(400).json({
                    error: 'Email already exists',
                });
            }

            const newUser = new User({
                username: req.body?.username,
                email: req.body?.email,
                password: bcrypt.hashSync(req.body?.password, 8),
            });

            const token = await signToken(newUser);

            newUser.token = token;
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
