import { RequestHandler } from "express";
import { client } from "../db"
import bcrypt from 'bcrypt'

export const signUp: RequestHandler = async (req, res) => {
    const { email, password, phone_number, address, name } = req.body;

    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // Check for duplicates in DB
    const foundUser = await client.query(`SELECT * FROM instructors WHERE email = $1`, [email])
    if (foundUser.rowCount !== 0) return res.sendStatus(401)

    try {
        bcrypt.genSalt().then(async salt => {
            const hash = await bcrypt.hash(req.body.password, salt)
            client.query(
                `INSERT INTO instructors(instructor_name, email, password, phone_number, address, roles)
                VALUES ($1, $2, $3, $4, $5, $6)`, [
                name,
                email,
                hash,
                phone_number,
                address,
                ["User"]
            ]);
            res.status(201).json({ 'success': `New user created!` })
        })
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}