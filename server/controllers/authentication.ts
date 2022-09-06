import { RequestHandler } from "express";
import { client } from "../db"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp: RequestHandler = async (req, res) => {
    bcrypt.genSalt().then(async salt => {
        const hash = await bcrypt.hash(req.body.password, salt)
        const queryResult = await client.query(
            `INSERT INTO instructors(instructor_name, username, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING instructor_id`, [
            req.body.name,
            req.body.username,
            req.body.email,
            hash,
            req.body.phone_number,
            req.body.address,
        ]);
        
        res.send({ success: true });
    })
}

export const signIn: RequestHandler = async (req, res) => {
    const queryResult = await client.query(
        `SELECT * FROM instructors WHERE username = $1`, [
        req.body.username
    ]
    )

    const hash = queryResult.rows[0].password
    const validPass = await bcrypt.compare(req.body.password, hash)

    if (validPass) {
        const userId = queryResult.rows[0].instructor_id
        const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET!, { expiresIn: '1 week' })
        res.json({ token: token })
    } else {
        res.send(null)
    }
}