import { Router } from 'express';
import {
    getUserData, addStudent, getStudentsData,
    addLesson, getHorsesData, getAvailableHours,
    authenticateToken, addHorse, getLessons, deleteStudent,
    deleteHorse, deleteLesson, getAvailableHorses, getMonthOfLessons,
    updateArrived, getSalaryPerMonth, getFavoriteHorse, getLessonsPerMonth
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/user', authenticateToken, getUserData)
usersRouter.get('/user-students', authenticateToken, getStudentsData)
usersRouter.get('/horses', authenticateToken, getHorsesData)
usersRouter.get('/horses-available', authenticateToken, getAvailableHorses)
usersRouter.get('/lessons-available', authenticateToken, getAvailableHours)
usersRouter.get('/lessons', authenticateToken, getLessons)
usersRouter.get('/lessons-monthly', authenticateToken, getMonthOfLessons)
usersRouter.get('/salary', authenticateToken, getSalaryPerMonth)
usersRouter.get('/lessons-per-month', authenticateToken, getLessonsPerMonth)
usersRouter.get('/favorite-horse', authenticateToken, getFavoriteHorse)
usersRouter.post('/add-student', authenticateToken, addStudent)
usersRouter.post('/add-lesson', authenticateToken, addLesson)
usersRouter.post('/add-horse', authenticateToken, addHorse)
usersRouter.delete('/delete-student', authenticateToken, deleteStudent)
usersRouter.delete('/delete-horse', authenticateToken, deleteHorse)
usersRouter.delete('/delete-lesson', authenticateToken, deleteLesson)
usersRouter.put('/update-arrived', authenticateToken, updateArrived)

export default usersRouter;