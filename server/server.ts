import express, { Express } from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import { initDb } from './db'
import path from 'path'
import registerRouter from './routes/register'
import authRouter from './routes/auth'
import { logOut } from './controllers/logoutController'
import { verifyJWT } from './middleware/verifyJWT'
import instructorRouter from './routes/api/instructors'
import { credentials } from './middleware/credentials'
import { corsOptions } from './config/corsOptions'
import rootRouter from './routes/root'
import adminRouter from './routes/api/admin'

const app: Express = express()

//Connecting to DB
initDb()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Built-in middleware for json
app.use(json())

// Middleware for cookies
app.use(cookieParser())

// Serve static files
app.use(express.static(path.join(__dirname, 'client')))

// Routes
app.use('/', rootRouter)
app.use('/api/register', registerRouter)
app.use('/api/auth', authRouter)
app.use('/api/logout', logOut)

// Routes that require authentication
app.use(verifyJWT)
app.use('/api/instructors', instructorRouter)
app.use('/api/admin', adminRouter)

app.get('*', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'client/index.html'))
})

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
  console.log('Hosted: http://localhost:' + PORT)
})
