import { RequestHandler } from "express";
import { client } from "../db"
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import { filterHours } from './helpFunctions'

//! Validation middleware

export const authenticateToken: RequestHandler = (req: any, res, next) => {
    const token = new Cookies(req.headers.cookie).get('token');
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

//! User related requests (students, lessons)

export const getUserData: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const result = (await client.query(`SELECT * FROM instructors WHERE instructor_id = $1`, [InstructorId])).rows[0];
    res.send({ result });
}

// Students related requests

export const getStudentsData: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const result = (await client.query('SELECT * FROM students WHERE instructor_id = $1', [InstructorId])).rows
    res.send({ result });
}

export const addStudent: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id

    const result = await client.query(
        `INSERT INTO students(student_name, id, date_of_birth, age, weight, height, hmo, address, framework, working_on, instructor_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [
        req.body.name,
        req.body.id,
        req.body.date_of_birth,
        req.body.age,
        req.body.weight,
        req.body.height,
        req.body.hmo,
        req.body.address,
        req.body.framework,
        req.body.working_on,
        InstructorId,
    ]);

    res.send({ result });
}

export const deleteStudent: RequestHandler = async (req: any, res) => {
    const studentId = req.query.student_id
    await client.query(`DELETE FROM students WHERE student_id=$1`, [studentId]);
    res.send({ success: true });
}

// Lessons related requests

export const getAvailableHours: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const horseId = req.query.horse_id
    const date = req.query.date

    console.log("horseId", horseId);
    console.log("date", date);

    const result = (await client.query(
        `SELECT lesson_time FROM lessons WHERE horse_id=$1 AND date=$3 OR instructor_id=$2 AND date=$3`, [
        horseId,
        InstructorId,
        date,
    ])).rows;

    const assignedHours = result.map(obj => obj.lesson_time)
    const filteredResults = filterHours(assignedHours)

    res.send({ filteredResults });
}

export const getLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const date = req.query.date

    const result = (await client.query(
        `SELECT *
         FROM lessons
         JOIN horses ON horses.horse_id = lessons.horse_id
         JOIN students ON students.student_id = lessons.student_id
         WHERE lessons.instructor_id=$1 AND lessons.date=$2`, [InstructorId, date])).rows;

    result.sort((a, b) => a.lesson_time.localeCompare(b.lesson_time));

    res.send({ result });
}

export const addLesson: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id

    const result = await client.query(
        `INSERT INTO lessons(horse_id, date, lesson_time, instructor_id, student_id) VALUES ($1, $2, $3, $4, $5)`, [
        req.body.horse_id,
        req.body.date,
        req.body.lesson_time,
        InstructorId,
        req.body.student_id,
    ]);

    res.send({ result });
}

export const deleteLesson: RequestHandler = async (req: any, res) => {
    const lessonId = req.query.lesson_id
    await client.query(`DELETE FROM lessons WHERE lesson_id=$1`, [lessonId]);
    res.send({ success: true });
}

//! Horses related requests

export const getHorsesData: RequestHandler = async (_req, res) => {
    const result = (await client.query('SELECT * FROM horses')).rows
    res.send({ result });
}

export const getAvailableHorses: RequestHandler = async (_req, res) => {
    const result = (await client.query('SELECT * FROM horses WHERE assignable=true')).rows
    res.send({ result });
}

export const addHorse: RequestHandler = async (req: any, res) => {
    const result1 = await client.query(
        `INSERT INTO horses(horse_name, age, breed, assignable) VALUES ($1, $2, $3, $4)`, [
        req.body.name,
        req.body.age,
        req.body.breed,
        req.body.assignable,
    ]);

    res.send({ success: true });
}

export const deleteHorse: RequestHandler = async (req: any, res) => {
    const horseId = req.query.horse_id
    await client.query(`DELETE FROM horses WHERE horse_id=$1`, [horseId]);
    res.send({ success: true });
}