import { Router } from 'express';
import { signUp, signIn } from '../controllers/authentication'

const registerRouter = Router();

registerRouter.post('/signup', signUp)
registerRouter.post('/signin', signIn)

export default registerRouter;
