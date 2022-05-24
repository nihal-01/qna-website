import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        authorId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;
