import { Router } from 'express';
import { signUp } from '../controllers/register'

const registerRouter = Router();

registerRouter.post('/signup', signUp)
// locationRouter.put('/update', updateLocation)
// locationRouter.post('/add', addLocation)
// locationRouter.delete('/remove', removeLocation)

export default registerRouter;
