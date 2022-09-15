import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import authRouter from './routes/authentication';
import usersRouter from './routes/users';
import { initDb } from './db';
import path from 'path';

const app: Express = express();
app.use(cors({ credentials: true, origin: process.env.PORT }));
app.use(json());
const root: string = path.join(process.cwd(), 'client');

app.use(express.static(root), authRouter);
app.use(express.static(root), usersRouter);

initDb()

app.get('*', (_req, res) => {
    res.sendFile(path.join(root, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Hosted: http://localhost:' + PORT);
});