import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser'
import { initDb } from './db';
import path from 'path';
import registerRouter from './routes/register';
import authRouter from './routes/auth';
import { logOut } from './controllers/logoutController';
import refreshTokenRouter from './routes/refresh';
import { verifyJWT } from './middleware/verifyJWT'
import instructorRouter from './routes/api/instructors';
import {credentials} from './middleware/credentials'
import { corsOptions } from './config/corsOptions';
import rootRouter from './routes/root';

const app: Express = express();

//Connecting to DB
initDb()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//Built-in middleware for json 
app.use(json());

//Middleware for cookies
app.use(cookieParser());

//Serve static files
app.use(express.static(path.join(__dirname, "..", 'client/build')))

//Routes
app.use('/', rootRouter);
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshTokenRouter)
app.use('/logout', logOut)

app.use(verifyJWT);
app.use('/instructors', instructorRouter)

app.get('*', (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, "..", 'client/build/index.html'));
})

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log('Hosted: http://localhost:' + PORT);
});

