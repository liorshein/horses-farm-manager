import { Router } from 'express';
import {
    getUserInfo, getStudentsData, getHorsesData, getLessons,
    updateArrived, getFavoriteHorse, getLessonsPerMonth
} from '../../controllers/instructorsController';
import { verifyRoles } from '../../middleware/verifyRoles';
const ROLES_LIST = require('../../config/rolesList')

const instructorRouter = Router();

instructorRouter.get('/user', verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), getUserInfo)
instructorRouter.get('/user-students', verifyRoles(ROLES_LIST.User), getStudentsData)
instructorRouter.get('/horses', verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), getHorsesData)
instructorRouter.get('/lessons', verifyRoles(ROLES_LIST.User), getLessons)
instructorRouter.get('/lessons-per-month', verifyRoles(ROLES_LIST.User), getLessonsPerMonth)
instructorRouter.get('/favorite-horse', verifyRoles(ROLES_LIST.User), getFavoriteHorse)
instructorRouter.put('/update-arrived', verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), updateArrived)

export default instructorRouter;