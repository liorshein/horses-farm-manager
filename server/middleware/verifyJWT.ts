import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const verifyJWT = (req: any, res: any, next: () => void) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.id;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}