import { Router } from 'express';
import { refreshToken } from '../controllers/refreshTokenController';

const refreshTokenRouter = Router();

refreshTokenRouter.get('/', refreshToken)

export default refreshTokenRouter;