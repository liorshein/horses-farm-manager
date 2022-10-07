import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { client } from '../db';
dotenv.config()

export const verifyJWT = (req: any, res: any, next: () => void) => {    
    const token = req.cookies.token
    jwt.verify(
        token,
        process.env.TOKEN_SECRET!,
        async (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); //invalid token            
            req.user = decoded.id;
            const foundUser = await client.query(`SELECT * FROM instructors WHERE instructor_id = $1`, [decoded.id])
            const roles = foundUser.rows[0].roles
            req.roles = roles
            next();
        }
    );
}