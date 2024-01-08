import express from "express";
import { createPost, updatePost, deletePost, likePost, getPost, getTimeline, getUserPost } from "../controllers/postsControllers.js";

const postsRoutes = express.Router();

// get a post
postsRoutes.get('/:id', getPost);

// create post
postsRoutes.post('/', createPost);

// update post
postsRoutes.put('/:id', updatePost);

// delete post
postsRoutes.delete('/:id', deletePost);

// like post
postsRoutes.put('/:id/like', likePost);

// Timeline post
postsRoutes.get('/timeline/:userId', getTimeline)

// get user post
postsRoutes.get('/profile/:username', getUserPost)

export default postsRoutes