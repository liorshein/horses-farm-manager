import { RequestHandler } from "express";
import { client } from "../db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const signIn: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' })

    const foundUser = await client.query(`SELECT * FROM instructors WHERE email = $1`, [email])

    if (foundUser.rowCount === 0) return res.sendStatus(401)

    const hash = foundUser.rows[0].password
    const validPass = await bcrypt.compare(password, hash)

    if (validPass) {
        const userId = foundUser.rows[0].instructor_id
        const roles = foundUser.rows[0].roles
        const userName = foundUser.rows[0].instructor_name

        // Create refreshToken
        const cookieJWT = jwt.sign({
            "UserInfo": {
                "id": userId,
                "name": userName,
                "roles": roles
            }
        },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        // Creates httpOnly Cookie with jwt token
        res.cookie("token", cookieJWT, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ roles, userName })
    } else {
        res.sendStatus(401)
    }
}

export const checkCookies: RequestHandler = (req, res) => {
    const jwtCookie = req.cookies.token;
    
    try {
        jwt.verify(jwtCookie, process.env.TOKEN_SECRET!, (_err: any, decoded: any) => {
            res.json(decoded.UserInfo);
        });
    } catch (error) {
        res.sendStatus(403)
    }
}