import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        authorId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        groupId: {
            type: mongoose.Types.ObjectId,
            ref: 'Group',
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
