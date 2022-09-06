import { Router } from 'express';
import {
    getUserData, addStudent, getStudentsData,
    addLesson, getHorsesData, getAvailableHours, authenticateToken, addHorse, getLessons
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/user', authenticateToken, getUserData)
usersRouter.get('/user-students', authenticateToken, getStudentsData)
usersRouter.get('/horses', authenticateToken, getHorsesData)
usersRouter.get('/lessons-available', authenticateToken, getAvailableHours)
usersRouter.get('/lessons', authenticateToken, getLessons)
usersRouter.post('/add-student', authenticateToken, addStudent)
usersRouter.post('/add-lesson', authenticateToken, addLesson)
usersRouter.post('/add-horse', authenticateToken, addHorse)

export default usersRouter;