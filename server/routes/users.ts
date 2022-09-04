import { Router } from 'express';
import { getUserData, addStudent, getStudentsData, addLesson, getHorsesData, getLessons, authenticateToken, getHorsesHours, addHorse } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/user', authenticateToken, getUserData)
usersRouter.get('/user-students', authenticateToken, getStudentsData)
usersRouter.get('/horses', authenticateToken, getHorsesData)
usersRouter.get('/lessons', authenticateToken, getLessons)
usersRouter.post('/add-student', authenticateToken, addStudent)
usersRouter.put('/add-lesson', authenticateToken, addLesson)
usersRouter.get('/horse-hours', authenticateToken, getHorsesHours)
usersRouter.post('/add-horse', authenticateToken, addHorse)

export default usersRouter;