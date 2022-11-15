import { RequestHandler } from "express";
import { client } from "../db";
import { filterHours } from "./helpFunctions";

export const addLessonData: RequestHandler = async (req, res) => {
    try {
        const lessons = (
            await client.query(
                `SELECT *
                FROM lessons2
                WHERE (lessons2.start_time <= $1 AND lessons2.end_time >= $2 AND lessons2.instructor_id=$3) OR (lessons2.start_time >= $1 AND lessons2.end_time <= $2 AND lessons2.instructor_id=$3)`,
                [req.body.start_time, req.body.end_time, req.body.instructor_id]
            )
        ).rows;

        if (lessons.length > 0) {
            res.status(409).send({
                message: "Lesson overlaps another!",
            });
        } else {
            const result = await client.query(
                `INSERT INTO lessons2(horse_id, start_time, end_time, instructor_id, student_id)
                VALUES ($1, $2, $3, $4, $5)
                WHERE
                RETURNING lesson_id`,
                [
                    req.body.horse_id,
                    req.body.start_time,
                    req.body.end_time,
                    req.body.instructor_id,
                    req.body.student_id,
                ]
            );
            res.send(result);
        }
    } catch (error) {
        res.status(409).send({
            message: "Horse is not available, contact farm management.",
        });
    }
};

export const editLesson: RequestHandler = async (req, res) => {
    try {
        await client.query(
            `UPDATE lessons2
            SET start_time=$1, end_time=$2
            WHERE lesson_id=$3`,
            [req.body.start, req.body.end, req.body.lesson_id]
        );
        res.end();
    } catch (error) {
        res.status(409).send({
            message: "Cannot update lesson, contact farm management.",
        });
    }
};

export const editStudent: RequestHandler = async (req, res) => {
    const result = await client.query(
        `UPDATE students
        SET student_name=$1, id=$2, date_of_birth=$3, age=$4,
            weight=$5, height=$6, address=$7, framework=$8, working_on=$9,
            hmo=$10, instructor_id=$11
        WHERE student_id=$12`,
        [
            req.body.student_name,
            req.body.id,
            req.body.date_of_birth,
            req.body.age,
            req.body.weight,
            req.body.height,
            req.body.address,
            req.body.framework,
            req.body.working_on,
            req.body.hmo,
            req.body.instructor_id,
            req.body.student_id,
        ]
    );

    res.send(result);
};

export const editHorse: RequestHandler = async (req, res) => {
    const result = await client.query(
        `UPDATE horses
        SET horse_name=$1, age=$2, breed=$3, assignable=$4
        WHERE horse_id=$5`,
        [
            req.body.horse_name,
            req.body.age,
            req.body.breed,
            req.body.assignable,
            req.body.horse_id,
        ]
    );

    res.send(result);
};

export const getStudentsData: RequestHandler = async (req: any, res) => {
    const InstructorId = req.query.instructor_id;
    const result = (
        await client.query("SELECT * FROM students WHERE instructor_id = $1", [
            Number(InstructorId),
        ])
    ).rows;
    res.send({ result });
};

export const getInstructorLessons: RequestHandler = async (req: any, res) => {
    const InstructorId = req.query.instructor_id;
    const date = req.query.date;

    const result = (
        await client.query(
            `SELECT *
         FROM lessons
         JOIN horses ON horses.horse_id = lessons.horse_id
         JOIN students ON students.student_id = lessons.student_id
         WHERE lessons.instructor_id=$1 AND lessons.date=$2`,
            [InstructorId, date]
        )
    ).rows;

    result.sort((a, b) => a.lesson_time.localeCompare(b.lesson_time));

    res.send({ result });
};

export const getAllInstructorsData: RequestHandler = async (_req, res) => {
    const result = (
        await client.query(`SELECT * FROM instructors WHERE instructor_id>1`)
    ).rows;
    res.send({ result });
};

export const getAllStudentsData: RequestHandler = async (_req, res) => {
    const result = (
        await client.query(
            `SELECT students.*, instructors.instructor_name
        FROM students
        LEFT JOIN instructors ON students.instructor_id = instructors.instructor_id`
        )
    ).rows;
    res.send({ result });
};

export const getLessonsPerMonth: RequestHandler = async (_req, res) => {
    const result = await client.query(
        `SELECT COUNT (lessons.*),SUBSTRING(date, 1, 7), instructors.instructor_name
        FROM lessons
        JOIN instructors ON lessons.instructor_id = instructors.instructor_id
        GROUP BY SUBSTRING(date, 1, 7), instructors.instructor_name`
    );
    res.send({ result });
};

export const addStudent: RequestHandler = async (req: any, res) => {
    const result = await client.query(
        `INSERT INTO students(student_name, id, date_of_birth, age, weight, height, hmo, address, framework, working_on, instructor_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
            req.body.student_name,
            req.body.id,
            req.body.date_of_birth,
            req.body.age,
            req.body.weight,
            req.body.height,
            req.body.hmo,
            req.body.address,
            req.body.framework,
            req.body.working_on,
            req.body.instructor_id,
        ]
    );

    res.send({ result });
};

export const deleteStudent: RequestHandler = async (req: any, res) => {
    const studentId = req.query.student_id;
    await client.query(`DELETE FROM students WHERE student_id=$1`, [studentId]);
    res.send({ success: true });
};

export const getAvailableHours: RequestHandler = async (req: any, res) => {
    const InstructorId = req.query.selectedInstructor;
    const horseId = req.query.horse_id;
    const date = req.query.date;

    const result = (
        await client.query(
            `SELECT lesson_time FROM lessons 
        WHERE horse_id=$1 AND date=$3 OR instructor_id=$2 AND date=$3`,
            [horseId, InstructorId, date]
        )
    ).rows;

    const assignedHours = result.map((obj) => obj.lesson_time);
    const filteredResults = filterHours(assignedHours);

    res.send({ filteredResults });
};

export const addLesson: RequestHandler = async (req: any, res) => {
    const result = await client.query(
        `INSERT INTO lessons(horse_id, date, lesson_time, instructor_id, student_id) VALUES ($1, $2, $3, $4, $5)`,
        [
            req.body.horse_id,
            req.body.date,
            req.body.lesson_time,
            req.body.instructor_id,
            req.body.student_id,
        ]
    );

    res.send({ result });
};

export const deleteLesson: RequestHandler = async (req: any, res) => {
    const lessonId = req.query.lesson_id;
    const result = await client.query(
        `DELETE FROM lessons2 WHERE lesson_id=$1`,
        [lessonId]
    );
    res.send(result);
};

export const getAvailableHorses: RequestHandler = async (_req, res) => {
    const result = (
        await client.query("SELECT * FROM horses WHERE assignable='True'")
    ).rows;
    res.send({ result });
};

export const addHorse: RequestHandler = async (req: any, res) => {
    await client.query(
        `INSERT INTO horses(horse_name, age, breed, assignable) VALUES ($1, $2, $3, $4)`,
        [req.body.horse_name, req.body.age, req.body.breed, req.body.assignable]
    );

    res.send({ success: true });
};

export const deleteHorse: RequestHandler = async (req: any, res) => {
    const horseId = req.query.horse_id;
    await client.query(`DELETE FROM horses WHERE horse_id=$1`, [horseId]);
    res.send({ success: true });
};
