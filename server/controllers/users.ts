import { RequestHandler } from "express";
import { client } from "../db"
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken'

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

    const result = await client.query(
        `SELECT * FROM lessons WHERE instructor_id=$1`, [
        InstructorId
    ]);

    res.send({ result });
}

export const getHorsesHours: RequestHandler = async (req, res) => {
    // const horseId = req.query.horse_id
    // console.log(horseId);
    const result = (await client.query('SELECT * FROM horses_lessons')).rows
    // const result = (await client.query('SELECT * FROM horses_lessons WHERE horse_id=$1', [horseId]))

    res.send({ result });
}

export const getInstructorHours: RequestHandler = async (req: any, res) => {
    const InstructorId = (req.user)._id
    const result = (await client.query('SELECT * FROM instructor_lessons WHERE instructor_id=$1', [InstructorId])).rows
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

    const result2 = await client.query(
        `INSERT INTO horses_lessons(date)
        SELECT generate_series(now(),now() + '1 years','1 day'::interval)`);

    const horseId = result1.rows[0].horse_id

    const result3 = await client.query(`UPDATE horses_lessons SET horse_id = $1 WHERE horse_id is null`, [horseId]);

    res.send({ success: true });
}