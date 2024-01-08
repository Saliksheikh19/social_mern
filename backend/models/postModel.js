import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        max: 500
    },
    postImage: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: String
    }
},
    { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema)