import nc from 'next-connect';

import { Question } from '../../../models';
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

handler.patch(async (req, res) => {
    const { questionId } = req.body;

    if (!questionId) {
        return res.status(400).json({ error: 'questionId required' });
    }

    const question = await Question.findById(questionId);
    let isFavourited = req.user.favourites
        ? req.user.favourites.includes(questionId)
        : false;

    if (isFavourited) {
        question.favouritesCount -= 1;
        const newFavourites = req.user.favourites.filter((fav) => {
            return fav.toString() !== questionId.toString();
        });
        req.user.favourites = newFavourites;
        isFavourited = false;
    } else {
        question.favouritesCount += 1;
        req.user.favourites
            ? req.user.favourites.push(questionId)
            : (req.user.favourites = [questionId]);
        isFavourited = true;
    }

    await req.user.save();
    await question.save();

    res.status(200).json({
        favouritesCount: question.favouritesCount,
        isFavourited,
    });
});

export default handler;
