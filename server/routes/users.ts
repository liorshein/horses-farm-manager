import { Router } from 'express';
import { getUserData, addStudent, getStudentsData } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/user', getUserData)
usersRouter.get('/user-students', getStudentsData)
usersRouter.post('/add-student', addStudent)

export default usersRouter;