import { Router } from 'express';
import { checkCookies, signIn } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/', signIn)
authRouter.get('/re-login', checkCookies)

export default authRouter;