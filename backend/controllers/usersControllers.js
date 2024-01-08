import bcryptjs from "bcryptjs";
import { User } from "../models/usersModel.js";

export const getUsers = (req, res) => {
    res.status(200).send('here are your users')
    console.log('here are your user');
}

export const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcryptjs.genSalt(10);
                req.body.password = await bcryptjs.hash(req.body.password, salt);

            } catch (error) {
                return res.status(500).send(error)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).send({
                status: 'success',
                message: 'User updated successfully',
                updatedUser: user
            })

        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(401).send('cannot update this account')
    }
}


export const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).send({
                status: 'Success',
                message: 'User deleted successfully'
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(500).send('cannot delete this account')
    }
}

// Get A user

export const getUser = async (req, res) => {
    const userId = req.query.userId;
    const userName = req.query.userName;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({ userName: userName })
        res.status(200).send({
            status: 'Success',
            mesage: 'User found',
            userDeatils: user
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!userToFollow.followers.includes(req.body.userId)) {
                await userToFollow.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).send({
                    status: 'Success',
                    message: 'User has been followed'
                })
            } else {
                res.status(400).send({
                    status: 'Failed',
                    message: 'You are already following this user'
                })
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(500).send({
            status: 'Failed',
            message: 'You cannot follow yourself'
        })
    }
}

export const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (userToFollow.followers.includes(req.body.userId)) {
                await userToFollow.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).send({
                    status: 'Success',
                    message: 'User has been unfollowed'
                })
            } else {
                res.status(400).send({
                    status: 'Failed',
                    message: 'You already unfollowed this user'
                })
            }
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(500).send({
            status: 'Failed',
            message: 'You cannot unfollow yourself'
        })
    }
}

export const getFriendList = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        )
        let firendList = [];
        friends.map((friend) => {
            const { _id, userName, profilePicture } = friend
            firendList.push({ _id, userName, profilePicture })
        });
        res.status(200).send({
            status: 'Success',
            message: firendList
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

