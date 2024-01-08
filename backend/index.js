import express from 'express';
import mongooes from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postsRoutes from './routes/postsRoutes.js';

const app = express();
app.use(cors());
const PORT = 8000;

dotenv.config();

const connect = () => {
    mongooes
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`connected to DB`);
        })
        .catch((err) => {
            throw err;
        });
};

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.use('/user', usersRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the server')
})

app.listen(PORT, () => {
    console.log("listening to the server");
    connect()
})