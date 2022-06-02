import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
    {
        answer: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reports: {
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
        replies: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
        isReply: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Answer = mongoose.models.Answer || mongoose.model('Answer', answerSchema);
export default Answer;
