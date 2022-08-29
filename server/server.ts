import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import registerRouter from './routes/register';
import { initDb } from './db';

const app: Express = express();
app.use(cors());
app.use(json());

app.use('/', registerRouter)

initDb()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Hosted: http://localhost:' + PORT);
});