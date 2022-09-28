import { allowedOrigins } from "../config/allowedOrigins";

export const credentials = (req: any, res: any, next: () => void) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}