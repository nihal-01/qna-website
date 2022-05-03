import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    followers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
});

const Category = models.Category || model('Category', categorySchema);
export default Category;
