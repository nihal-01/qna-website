import nc from 'next-connect';

import { Answer } from '../../../../models';
import { connectDb, isAuth } from '../../../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

handler.delete(async (req, res) => {
    const { answerId } = req.query;
    await Answer.findByIdAndDelete(answerId);
    res.status(200).json({ message: 'deleted successfully' });
});

handler.patch(async (req, res) => {
    const { answerId } = req.query;
    await Answer.findByIdAndUpdate(answerId, {
        answer: req.body.answer,
    });
    res.status(200).json({ message: 'Successfull' });
});

export default handler;
