import { Router } from "express";
import { verifyJWT } from '../../middleware/verifyJWT'
import {
  addStudent, addHorse, editStudent, deleteStudent, deleteHorse, deleteLesson,
  getAvailableHorses, getLessonsPerMonth, getAllStudentsData, getAllInstructorsData,
  getStudentsData, editHorse, editLesson, addLesson,
} from "../../controllers/adminController";
import { verifyRoles } from "../../middleware/verifyRoles";

const ROLES_LIST = require("../../config/rolesList");

const adminRouter = Router();

// Instructor related routes
adminRouter.get("/instructors", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], getAllInstructorsData);

// Lessons related routes
adminRouter.get("/instructors-lessons-per-month", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], getLessonsPerMonth);
adminRouter.post("/add-lesson", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], addLesson);
adminRouter.put("/edit-lesson", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], editLesson);
adminRouter.delete("/delete-lesson", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], deleteLesson);

// Students related routes
adminRouter.get("/instructor-students", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], getStudentsData);
adminRouter.get("/students", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], getAllStudentsData);
adminRouter.post("/add-student", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], addStudent);
adminRouter.put("/edit-student", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], editStudent);
adminRouter.delete("/delete-student", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], deleteStudent);

// Horses related routes
adminRouter.get("/horses-available", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], getAvailableHorses);
adminRouter.post("/add-horse", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], addHorse);
adminRouter.put("/edit-horse", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], editHorse);
adminRouter.delete("/delete-horse", [verifyJWT, verifyRoles(ROLES_LIST.Admin)], deleteHorse);

export default adminRouter;
