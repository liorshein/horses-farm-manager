import { Router } from 'express';
import {
    addStudent, addLesson, addHorse, 
    deleteStudent, deleteHorse, deleteLesson,
    getAvailableHorses, getAvailableHours, getInstructorLessons, 
    getLessonsPerMonth, getAllStudentsData, getAllInstructorsData, getStudentsData, getMonthOfLessons} from '../../controllers/adminController';
import { verifyRoles } from '../../middleware/verifyRoles';
const ROLES_LIST = require('../../config/rolesList')

const adminRouter = Router();

adminRouter.get('/lessons-monthly', verifyRoles(ROLES_LIST.Admin), getMonthOfLessons)
adminRouter.get('/instructors-lessons-per-month', verifyRoles(ROLES_LIST.Admin), getLessonsPerMonth)
adminRouter.get('/instructor-lessons', verifyRoles(ROLES_LIST.Admin), getInstructorLessons)
adminRouter.get('/instructor-students', verifyRoles(ROLES_LIST.Admin), getStudentsData)
adminRouter.get('/instructors', verifyRoles(ROLES_LIST.Admin), getAllInstructorsData)
adminRouter.get('/horses-available', verifyRoles(ROLES_LIST.Admin), getAvailableHorses)
adminRouter.get('/students', verifyRoles(ROLES_LIST.Admin), getAllStudentsData)
adminRouter.get('/lessons-available', verifyRoles(ROLES_LIST.Admin), getAvailableHours)
adminRouter.post('/add-student', verifyRoles(ROLES_LIST.Admin), addStudent)
adminRouter.post('/add-lesson', verifyRoles(ROLES_LIST.Admin), addLesson)
adminRouter.post('/add-horse', verifyRoles(ROLES_LIST.Admin), addHorse)
adminRouter.delete('/delete-student', verifyRoles(ROLES_LIST.Admin), deleteStudent)
adminRouter.delete('/delete-horse', verifyRoles(ROLES_LIST.Admin), deleteHorse)
adminRouter.delete('/delete-lesson', verifyRoles(ROLES_LIST.Admin), deleteLesson)

export default adminRouter;