import express from 'express';
import { logIn, signUp } from '../controllers/authControllers.js';

const authRoutes = express.Router();


authRoutes.get('/', (req, res) => {
    res.status(200).send('this is authentication route')
});
authRoutes.get('/', (req, res) => {
    res.status(200).send('this is authentication route')
});
authRoutes.post('/signup', signUp);
authRoutes.post('/login', logIn);

export default authRoutes;