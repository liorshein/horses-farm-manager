import { RequestHandler } from "express";
import { client } from "../db"

// Sends to client basic user info
export const getUserInfo: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user

    const result = (await client.query(`
    SELECT instructor_name, email, phone_number, address
    FROM instructors 
    WHERE instructor_id = $1`, [InstructorId])).rows[0];
    res.send({ result });
}

// Sends to client the lessons of the instructor per month
export const getLessonsPerMonth: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user
    const result = await client.query(`
    SELECT COUNT (*),SUBSTRING(date, 1, 7) 
    FROM lessons 
    WHERE instructor_id=$1 
    GROUP BY SUBSTRING(date, 1, 7) 
    ORDER BY SUBSTRING(date, 1, 7)`, [InstructorId]);
    res.send({ result });
}

// Sends to client all the horses he uses and how much
export const getFavoriteHorse: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user
    const result = (await client.query(
        `SELECT COUNT(lessons.horse_id), horses.horse_name
        FROM lessons 
        JOIN horses ON horses.horse_id = lessons.horse_id
        WHERE lessons.instructor_id=$1 
        GROUP BY lessons.horse_id, horses.horse_name
        ORDER BY COUNT(lessons.horse_id) DESC`, [InstructorId]));    
    res.send({ result });
}

// Sends to client all the months he have lessons on
export const getMonthOfLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user
    const result = await client.query(`SELECT DISTINCT ON (1) SUBSTRING(date, 1, 7) FROM lessons WHERE instructor_id=$1`, [InstructorId]);
    res.send({ result });
}

// Students related requests

export const getStudentsData: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user
    const result = (await client.query('SELECT * FROM students WHERE instructor_id = $1', [InstructorId])).rows
    res.send({ result });
}

export const updateArrived: RequestHandler = async (req, _res) => {
    const lessonId = req.query.lesson_id
    let booleanStr = req.query.arrived
    await client.query(`UPDATE lessons SET arrived=$1 WHERE lesson_id=$2`, [booleanStr, lessonId])
}

// Lessons related requests

export const getLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user
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

//! Horses related requests

export const getHorsesData: RequestHandler = async (_req, res) => {
    const result = (await client.query('SELECT * FROM horses')).rows
    res.send({ result });
}