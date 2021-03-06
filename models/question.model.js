import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        tags: {
            type: [
                {
                    type: String,
                    lowercase: true,
                    trim: true,
                },
            ],
        },
        details: {
            type: String,
            required: true,
        },
        poll: {
            type: [
                {
                    option: {
                        type: String,
                        required: true,
                        lowercase: true,
                    },
                    votes: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
        },
        polledUsers: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
        isPoll: {
            type: Boolean,
            default: false,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        notifyEmail: {
            type: Boolean,
            default: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reports: {
            type: Number,
            default: 0,
        },
        votes: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        upvotes: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
        downvotes: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },
        favouritesCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

questionSchema.virtual('numOfAnswers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionId',
    count: true,
});

questionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionId',
});

const Question = mongoose.models.Question || model('Question', questionSchema);
export default Question;
