import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { client } from "../db";

dotenv.config()

export const refreshToken: RequestHandler = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.token) return res.sendStatus(401);
    const refreshToken = cookies.token

    const results = await client.query('SELECT * FROM instructors WHERE refresh_token = $1', [refreshToken])

    if (results.rowCount === 0) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err || results.rows[0].instructor_id !== decoded.id) return res.sendStatus(403)
            const roles = results.rows[0].roles
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": decoded.id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '5m' }
            )
            res.json({ accessToken })
        }
    )
}