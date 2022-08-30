import { RequestHandler } from "express";
import { client } from "../db"
import Cookies from 'universal-cookie';

export const getUserData: RequestHandler = async (req, res) => {
    const cookies = new Cookies(req.headers.cookie);
    const result = (await client.query(`SELECT * FROM instructors WHERE password = $1`, [cookies.get('token')])).rows[0];
    res.send({ result });
}

export const getStudentsData: RequestHandler = async (req, res) => {
    const cookies = new Cookies(req.headers.cookie);
    const user_id = (await client.query(`SELECT * FROM instructors WHERE password = $1`, [cookies.get('token')])).rows[0].instructor_id;
    
    const result = (await client.query('SELECT * FROM students WHERE instructor_id = $1', [user_id])).rows
    
    res.send({ result });
}

export const addStudent: RequestHandler = async (req, res) => {
    const cookies = new Cookies(req.headers.cookie);
    const user_id = (await client.query(`SELECT * FROM instructors WHERE password = $1`, [cookies.get('token')])).rows[0].instructor_id;

    const result = await client.query(
        `INSERT INTO students(name, age, instructor_id) VALUES ($1, $2, $3)`, [
        req.body.name,
        req.body.age,
        user_id,
    ]);
    res.send({ result });
}
