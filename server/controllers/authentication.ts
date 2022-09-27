import { RequestHandler } from "express";
import { client } from "../db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp: RequestHandler = async (req, res) => {
    try {
        bcrypt.genSalt().then(async salt => {
            const hash = await bcrypt.hash(req.body.password, salt)
            await client.query(
                `INSERT INTO instructors(instructor_name, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING instructor_id`, [
                req.body.name,
                req.body.email,
                hash,
                req.body.phone_number,
                req.body.address,
            ]);

            res.send({ success: true });
        })
    } catch (error) {
        res.send({ success: false });
    }
}

export const signIn: RequestHandler = async (req, res) => {
    const queryResult = await client.query(
        `SELECT * FROM instructors WHERE email = $1`, [
        req.body.email
    ])
    if (queryResult.rowCount !== 0) {
        const hash = queryResult.rows[0].password
        const validPass = await bcrypt.compare(req.body.password, hash)

        if (validPass) {
            const userId = queryResult.rows[0].instructor_id
            const tokenJWT = jwt.sign({ _id: userId }, process.env.JWT_SECRET!, { expiresIn: '1 week' })
            let today = new Date()
            let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
            res.cookie("token", tokenJWT, { httpOnly: true, expires: nextWeek, sameSite: "strict", secure: true })
            res.json(tokenJWT)
        }
    } else {
        res.send(null)
    }
}