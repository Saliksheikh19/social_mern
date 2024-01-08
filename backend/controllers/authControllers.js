import { User } from "../models/usersModel.js"
import bcryptjs from "bcryptjs";


export const signUp = async (req, res) => {
    console.log('signup Api working')
    // console.log(req.body);

    try {

        // hashing password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        // creating user

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });

        // saving user in DB

        const newUser = await user.save();
        res.status(200).send({
            status: 'success',
            message: 'User registered successfully',
            userInDB: newUser
        })

    } catch (error) {
        console.log(error);

    }
}

export const logIn = async (req, res) => {
    console.log('logIn Api working')
    try {

        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).send('User not found');
            return
        }

        const validPassword = await bcryptjs.compare(req.body.password, user.password);
        if(!validPassword){
            res.status(400).send('Incorrect password')
            return
        }

        res.status(200).send({
            status: 'success',
            message: 'User logged in successfully',
            loggedInUser: user
        });

    } catch (error) {
        console.log(error);
    }

}