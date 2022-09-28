import { Router } from 'express';
import { logOut } from '../controllers/logoutController';

const logOutRouter = Router();

logOutRouter.get('/', logOut)

export default logOutRouter;