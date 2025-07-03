import express from 'express';
import { router } from './routes/userRoutes.js';
import { Port } from './config.js';

const app = express();

app.use(express.json());

app.use('/api/users', router);

app.listen(Port, () => {
    console.log(`Server is Running on ${Port}`);
})