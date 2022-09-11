import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import authRouter from './routes/authentication';
import usersRouter from './routes/users';
import { initDb } from './db';

const app: Express = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(json());

app.use('/', authRouter)
app.use('/', usersRouter)

initDb()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Hosted: http://localhost:' + PORT);
});