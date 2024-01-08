import { Post } from "../models/postModel.js";
import { User } from "../models/usersModel.js";

export const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).send({
            status: 'Success',
            message: 'Post created successfully',
            post: newPost
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).send({
                status: 'Success',
                message: 'Post updated'
            })
        } else {
            res.status(400).send({
                status: 'Failed',
                message: 'You are not the author of this post'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).send({
                status: 'Success',
                message: 'Post deleted'
            })
        } else {
            res.status(400).send({
                status: 'Failed',
                message: 'You are not the author of this post'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const postToLike = await Post.findById(req.params.id);
        if (!postToLike.likes.includes(req.body.userId)) {
            await postToLike.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).send({
                status: 'Success',
                message: 'You like this post'
            })
        } else {
            await postToLike.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).send({
                status: 'Success',
                message: 'You dislike this post'
            })
        }
    } catch (error) {
        res.status(404).send({
            status: 'Success',
            message: error.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send({
            status: 'Success',
            message: 'here is the post',
            data: post
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const getTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPost = await Post.find({ userId: currentUser._id })
        const friendsPost = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).send({
            status: 'Success',
            data: userPost.concat(...friendsPost)
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}


export const getUserPost = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.params.username });
        const posts = await Post.find({ userId: user._id })
        res.status(200).send({
            status: 'Success',
            data: posts
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}