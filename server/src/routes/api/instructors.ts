import { Router } from 'express'
import { verifyJWT } from '../../middleware/verifyJWT'
import {
  getUserInfo, getStudentsData, getHorsesData, getLessons,
  updateArrived, getFavoriteHorse, getLessonsPerMonth
} from '../../controllers/instructorsController'
import { verifyRoles } from '../../middleware/verifyRoles'

const ROLES_LIST = require('../../config/rolesList')

const instructorRouter = Router()

// User related routes
instructorRouter.get('/user', [verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], getUserInfo)
instructorRouter.get('/user-students', [verifyJWT, verifyRoles(ROLES_LIST.User)], getStudentsData)

// General routes
instructorRouter.get('/lessons', [verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], getLessons)
instructorRouter.get('/horses', [verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], getHorsesData)
instructorRouter.get('/lessons-per-month', [verifyJWT, verifyRoles(ROLES_LIST.User)], getLessonsPerMonth)
instructorRouter.get('/favorite-horse', [verifyJWT, verifyRoles(ROLES_LIST.User)], getFavoriteHorse)
instructorRouter.put('/update-arrived', [verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], updateArrived)

export default instructorRouter
