import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` })

import { register } from './routes/register.js';
import { index } from './routes/index.js';
import { post } from './routes/post.js';
import { login } from './routes/login.js';

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.MONGDB_URL}`);
    await mongoose.connect(process.env.MONGDB_URL);
    console.log(`Connected to DB @ ${process.env.MONGDB_URL}`);
};

main().catch(err => console.log(err))

app.use(express.json());
app.use(cors());
app.use(`/`, index);
app.use(`/post`, post);
app.use(`/register`, register);
app.use(`/login`, login);

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;