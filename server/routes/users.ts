import { Router } from 'express';
import {
    getUserData, addStudent, getStudentsData,
    addLesson, getHorsesData, getAvailableHours,
    authenticateToken, addHorse, getLessons, deleteStudent,
    deleteHorse, deleteLesson
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
usersRouter.delete('/delete-student', authenticateToken, deleteStudent)
usersRouter.delete('/delete-horse', authenticateToken, deleteHorse)
usersRouter.delete('/delete-lesson', authenticateToken, deleteLesson)

export default usersRouter;