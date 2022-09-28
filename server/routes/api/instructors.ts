import { Router } from 'express';
import {
    getUserData, addStudent, getStudentsData, addLesson, getHorsesData, getAvailableHours,
    addHorse, getLessons, deleteStudent, deleteHorse, deleteLesson, getAvailableHorses, getMonthOfLessons,
    updateArrived, getSalaryPerMonth, getFavoriteHorse, getLessonsPerMonth
} from '../../controllers/instructorsController';
import { verifyRoles } from '../../middleware/verifyRoles';
const ROLES_LIST = require('../../config/rolesList')

const instructorRouter = Router();

instructorRouter.get('/user', verifyRoles(ROLES_LIST.User), getUserData)
instructorRouter.get('/user-students', verifyRoles(ROLES_LIST.User), getStudentsData)
instructorRouter.get('/horses', verifyRoles(ROLES_LIST.User), getHorsesData)
instructorRouter.get('/horses-available', verifyRoles(ROLES_LIST.User), getAvailableHorses)
instructorRouter.get('/lessons-available', verifyRoles(ROLES_LIST.User), getAvailableHours)
instructorRouter.get('/lessons', verifyRoles(ROLES_LIST.User), getLessons)
instructorRouter.get('/lessons-monthly', verifyRoles(ROLES_LIST.User), getMonthOfLessons)
instructorRouter.get('/salary', verifyRoles(ROLES_LIST.User), getSalaryPerMonth)
instructorRouter.get('/lessons-per-month', verifyRoles(ROLES_LIST.User), getLessonsPerMonth)
instructorRouter.get('/favorite-horse', verifyRoles(ROLES_LIST.User), getFavoriteHorse)
instructorRouter.put('/update-arrived', verifyRoles(ROLES_LIST.User), updateArrived)
instructorRouter.post('/add-student', verifyRoles(ROLES_LIST.User), addStudent)
instructorRouter.post('/add-lesson', verifyRoles(ROLES_LIST.User), addLesson)
instructorRouter.post('/add-horse', verifyRoles(ROLES_LIST.User), addHorse)
instructorRouter.delete('/delete-student', verifyRoles(ROLES_LIST.User), deleteStudent)
instructorRouter.delete('/delete-horse', verifyRoles(ROLES_LIST.User), deleteHorse)
instructorRouter.delete('/delete-lesson', verifyRoles(ROLES_LIST.User), deleteLesson)

export default instructorRouter;