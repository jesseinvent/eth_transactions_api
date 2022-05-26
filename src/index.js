import express from 'express';
import routes from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express()

app.use(express.json());

app.use(routes)

app.listen(3000, () => console.log(`Server listening on localhost:3000`));