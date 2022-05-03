import nc from 'next-connect';

import { Category } from '../../models';
import { connectDb } from '../../middlewares';

const handler = nc({
    onError: (err, req, res, next) => {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        return res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
        return res.status(404).json({ error: 'Page not found!' });
    },
});

handler.use(connectDb);

handler.post(async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
        name,
    });

    await newCategory.save();
    res.status(200).json(newCategory);
});

handler.get(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
});

export default handler;
