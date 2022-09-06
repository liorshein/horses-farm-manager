import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

export const client = new Client({

    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export const initDb = async () => {

    await client.connect();

    await client.query(
        `CREATE TABLE IF NOT EXISTS instructors(
            instructor_id SERIAL PRIMARY KEY,
            instructor_name TEXT NOT NULL,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            address TEXT NOT NULL,
            UNIQUE (email, password)
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS horses(
            horse_id SERIAL PRIMARY KEY,
            horse_name TEXT NOT NULL,
            age INTEGER NOT NULL,
            breed TEXT NOT NULL,
            assignable BOOLEAN NOT NULL,
            UNIQUE (horse_name, age)
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS students(
            student_id SERIAL PRIMARY KEY,
            student_name TEXT NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            background_info TEXT NOT NULL,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL,
            UNIQUE (student_name, background_info)
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS work_topics(
            work_topics_id SERIAL PRIMARY KEY,
            details TEXT NOT NULL,
            achieved BOOLEAN,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS lessons(
            lesson_id SERIAL PRIMARY KEY,
            horse_id INTEGER,
            CONSTRAINT fk_horse FOREIGN KEY(horse_id)
            REFERENCES horses(horse_id)
            ON DELETE CASCADE,
            date TEXT,
            lesson_time TEXT,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE CASCADE,
            student_id INTEGER,
            CONSTRAINT fk_student FOREIGN KEY(student_id)
            REFERENCES students(student_id)
            ON DELETE CASCADE,
            UNIQUE (horse_id, date, lesson_time, instructor_id, student_id)
        );`
    );

    console.log("create");
}
