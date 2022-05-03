import { db } from '../utils';

const connectDb = async (req, res, next) => {
    try {
        await db.connect();
        next();
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

export default connectDb;
