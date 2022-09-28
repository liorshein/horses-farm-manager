import { RequestHandler } from "express";
import { client } from "../db";

export const logOut: RequestHandler = async (req, res) => {

    //! Delete accessToken on client also - Reminder!!

    const cookies = req.cookies;    
    if (!cookies?.token) return res.sendStatus(204);
    const refreshToken = cookies.token

    // Is refreshToken in DB?
    const results = await client.query('SELECT * FROM instructors WHERE refresh_token = $1', [refreshToken])    
    
    if (results.rowCount === 0) {
        res.clearCookie('token', {httpOnly: true, sameSite: "none", secure: true})
        return res.sendStatus(204);
    }

    // Delete refreshToken in DB
    client.query('UPDATE instructors SET refresh_token = NULL WHERE refresh_token = $1', [refreshToken])
    res.clearCookie('token', {httpOnly: true, sameSite: "none", secure: true})
    res.sendStatus(204);
}