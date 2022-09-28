import { Router } from 'express';
import { signIn } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/', signIn)

export default authRouter;