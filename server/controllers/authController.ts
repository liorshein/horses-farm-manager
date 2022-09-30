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

        // Create accessToken
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": userId,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '5m' }
        );

        // Create refreshToken
        const refreshToken = jwt.sign(
            { "id": userId },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        client.query(`UPDATE instructors SET refresh_token = $1 WHERE instructor_id = $2`, [refreshToken, userId])

        // Creates Secure Cookie with refresh token
        res.cookie("token", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })

        // Send authorization roles and access token to user
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}