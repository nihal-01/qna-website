import mongoose from 'mongoose';
import { Schema, models, model } from 'mongoose';

const groupSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        postPermission: {
            type: Boolean,
            default: false,
        },
        profile: {
            type: String,
            trim: true,
        },
        cover: {
            type: String,
            trim: true,
        },
        rules: {
            type: String,
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        users: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        },
    },
    { timestamps: true }
);

groupSchema.virtual('numOfPosts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'groupId',
    count: true,
});

const Group = models.Group || model('Group', groupSchema);
export default Group;
