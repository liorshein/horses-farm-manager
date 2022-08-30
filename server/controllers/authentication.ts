import { RequestHandler } from "express";
import { client } from "../db"

export const signUp: RequestHandler = async (req, res) => {
    const queryResult = await client.query(
        `INSERT INTO instructors(name, username, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6)`, [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.phone_number,
        req.body.address,
    ]
    )
    res.send({ success: true });
}

export const signIn: RequestHandler = async (req, res) => {
    const queryResult = await client.query(
        `SELECT * FROM instructors
        WHERE username = $1 AND password = $2`, [req.body.username, req.body.password]
    )

    if (queryResult.rows[0] !== undefined) {
        res.send({ token: "accessesApproved"})
    } else {
        res.send(null)
    }
}