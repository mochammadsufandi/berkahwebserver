import express from 'express';
import dotenv from 'dotenv';
import router from './routes/main';

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use('/api',router);

app.listen(port, () => {
    console.log(`server is listening on PORT : ${port}`);
})