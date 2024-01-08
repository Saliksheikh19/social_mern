import express from "express";
import { getUsers, updateUser, deleteUser, getUser, followUser, unfollowUser, getFriendList } from "../controllers/usersControllers.js";

const usersRoutes = express.Router();

// Update user
usersRoutes.put('/:id', updateUser);

// Delete User
usersRoutes.delete('/:id', deleteUser);

// get a user
usersRoutes.get('/', getUser)

// follow user
usersRoutes.put('/:id/follow', followUser)

// unfollow user
usersRoutes.put('/:id/unfollow', unfollowUser)

//get friends list
usersRoutes.get('/friends/:userId', getFriendList)

export default usersRoutes;