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
        `INSERT INTO students(student_name, age, weight, background_info, instructor_id) VALUES ($1, $2, $3, $4, $5)`, [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.background_info,
        InstructorId,
    ]);

    res.send({ result });
}

// Lessons related requests

export const getAvailableHours: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const horseId = req.query.horse_id
    const date = req.query.date

    const result = (await client.query(
        `SELECT lesson_time FROM lessons WHERE horse_id=$1 AND date=$2`, [
        horseId,
        date
    ])).rows;

    const assignedHours = result.map(obj => obj.lesson_time)
    const filteredResults = filterHours(assignedHours)    

    res.send({ filteredResults });
}

export const getLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id

    const result = (await client.query(
        `SELECT *
         FROM lessons
         JOIN horses ON horses.horse_id = lessons.horse_id
         JOIN students ON students.student_id = lessons.student_id
         WHERE lessons.instructor_id=$1`, [
        InstructorId,
    ])).rows;
    
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

//! Horses related requests

export const getHorsesData: RequestHandler = async (req, res) => {
    const result = (await client.query('SELECT * FROM horses')).rows
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