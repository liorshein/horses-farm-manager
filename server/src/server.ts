if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

import express, { Express, json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initDb } from './db'
import path from 'path'
import registerRouter from './routes/register'
import authRouter from './routes/auth'
import { logOut } from './controllers/logoutController'
import instructorRouter from './routes/api/instructors'
import adminRouter from './routes/api/admin'

const app: Express = express()

// Connecting to DB
initDb()

// Allow access to query, params and such.
app.use(express.urlencoded({ extended: true }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(cors({ credentials: true, origin: true, }));

// Built-in middleware for json
app.use(json())

// Middleware for cookies
app.use(cookieParser())

// Routes
app.use('/api/register', registerRouter)
app.use('/api/auth', authRouter)
app.use('/api/logout', logOut)

// Routes that require authentication
app.use('/api/instructors', instructorRouter)
app.use('/api/admin', adminRouter)

// Serve static files
if (process.env.NODE_ENV == "production") {

  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
  console.log('Hosted: http://localhost:' + PORT)
})

//This will output unhandled Rejection
process.on("unhandledRejection", (error: Error, promise) => {
  console.log(`unhandled Rejection: ${error} \n ErrorStack: ${error.stack}`);
});


//This will output unhandled Exception
process.on("uncaughtException", (error: Error, promise) => {
  console.log(`uncaught Exception: ${error} \n ErrorStack: ${error.stack}`);
});
