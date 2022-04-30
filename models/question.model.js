import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        enum: ['language', 'programming'],
    },
    tags: {
        type: Array,
        lowercase: true,
        trim: true,
    },
    details: {
        type: String,
        required: true,
    },
});
