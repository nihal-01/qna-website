import nc from 'next-connect';

import { Answer, Question } from '../../../models';
import { connectDb, isAuth } from '../../../middlewares';
import { getAllQuestions } from '../../../helpers/questionsHelpers';

const handler = nc({
    onError: (err, req, res, next) => {
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb, isAuth);

export default handler;
