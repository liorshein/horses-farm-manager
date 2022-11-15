import { RequestHandler } from "express";
import { client } from "../db";

// Sends to client basic user info
export const getUserInfo: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user;

    const result = (
        await client.query(
            `
    SELECT instructor_name, email, phone_number, address
    FROM instructors 
    WHERE instructor_id = $1`,
            [InstructorId]
        )
    ).rows[0];
    res.send({ result });
};

// Sends to client the lessons of the instructor per month
export const getLessonsPerMonth: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user;
    const result = await client.query(
    `SELECT COUNT (*),trim(TO_CHAR(end_time, 'Month')) || ', ' || trim(TO_CHAR(end_time, 'yyyy')) as mydate
    FROM lessons2 
    WHERE instructor_id=$1 
    GROUP BY mydate 
    ORDER BY mydate`,
        [InstructorId]
    );
    
    res.send({ result });
};

// Sends to client all the horses he uses and how much
export const getFavoriteHorse: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user;
    const result = await client.query(
        `SELECT COUNT(lessons2.horse_id), horses.horse_name
        FROM lessons2
        JOIN horses ON horses.horse_id = lessons2.horse_id
        WHERE lessons2.instructor_id=$1 
        GROUP BY lessons2.horse_id, horses.horse_name
        ORDER BY COUNT(lessons2.horse_id) DESC`,
        [InstructorId]
    );
    res.send({ result });
};

// Students related requests

export const getStudentsData: RequestHandler = async (req: any, res) => {
    const InstructorId = req.user;
    const result = (
        await client.query("SELECT * FROM students WHERE instructor_id = $1", [
            InstructorId,
        ])
    ).rows;
    res.send({ result });
};

export const updateArrived: RequestHandler = async (req, _res) => {
    const lessonId = req.query.lesson_id;
    let booleanStr = req.query.arrived;
    await client.query(`UPDATE lessons SET arrived=$1 WHERE lesson_id=$2`, [
        booleanStr,
        lessonId,
    ]);
};

// Lessons related requests

export const getLessons: RequestHandler = async (req, res) => {
    const instructor = req.query.instructor;
    const start = req.query.start;
    const end = req.query.end;

    const result = (
        await client.query(
            `SELECT lessons2.*, students.student_name, horses.horse_name
            FROM lessons2
            JOIN students ON lessons2.student_id = students.student_id
            JOIN horses ON lessons2.horse_id = horses.horse_id
            WHERE lessons2.start_time >= $1 AND lessons2.end_time <= $2 AND lessons2.instructor_id=$3`,
            [start, end, instructor]
        )
    ).rows;

    res.send(result);
};

//! Horses related requests

export const getHorsesData: RequestHandler = async (_req, res) => {
    const result = (await client.query("SELECT * FROM horses")).rows;
    res.send({ result });
};
