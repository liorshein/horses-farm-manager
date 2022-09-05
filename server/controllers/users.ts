import { RequestHandler } from "express";
import { client } from "../db"
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'
import { filterHours } from './helpFunctions'

export const authenticateToken: RequestHandler = (req: any, res, next) => {
    const token = new Cookies(req.headers.cookie).get('token');
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export const getUserData: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const result = (await client.query(`SELECT * FROM instructors WHERE instructor_id = $1`, [InstructorId])).rows[0];
    res.send({ result });
}

export const getStudentsData: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const result = (await client.query('SELECT * FROM students WHERE instructor_id = $1', [InstructorId])).rows
    res.send({ result });
}

export const getHorsesData: RequestHandler = async (req, res) => {
    const result = (await client.query('SELECT * FROM horses')).rows
    res.send({ result });
}

export const addLesson: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id

    const result = await client.query(
        `INSERT INTO lessons(range, instructor_id, student_id, horse_id) VALUES ($1, $2, $3, $4)`, [
        req.body.range,
        InstructorId,
        req.body.student_id,
        req.body.horse_id,
    ]);

    res.send({ result });
}

export const getLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const horseId = req.query.horse_id
    const date = req.query.date

    const result = (await client.query(
        `SELECT * FROM lessons WHERE instructor_id=$1 AND horse_id=$2 AND date=$3`, [
        InstructorId,
        horseId,
        date
    ])).rows;

    const filteredResults = filterHours(result)

    res.send({ filteredResults });
}

export const getHorsesHours: RequestHandler = async (req, res) => {
    const horseId = req.query.horse_id
    const date = req.query.date
    const result = (await client.query(`SELECT * FROM horses_lessons WHERE horse_id=$1 AND date=$2`, [horseId, date]))
    res.send({ result });
}

export const getInstructorHours: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const date = req.query.date
    const result = (await client.query(`SELECT * FROM instructor_lessons WHERE instructor_id=$1 AND date=$2`, [InstructorId, date]))
    res.send({ result });
}

export const addStudent: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id

    const result = await client.query(
        `INSERT INTO students(name, age, weight, background_info, instructor_id) VALUES ($1, $2, $3, $4, $5)`, [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.background_info,
        InstructorId,
    ]);

    res.send({ result });
}

export const addHorse: RequestHandler = async (req: any, res) => {
    const result1 = await client.query(
        `INSERT INTO horses(name, age, breed, assignable) VALUES ($1, $2, $3, $4) RETURNING horse_id`, [
        req.body.name,
        req.body.age,
        req.body.breed,
        req.body.assignable,
    ]);

    res.send({ success: true });
}