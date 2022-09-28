import { Router } from 'express';
import { signUp } from '../controllers/registerController';

const registerRouter = Router();

registerRouter.post('/', signUp)

export default registerRouter;