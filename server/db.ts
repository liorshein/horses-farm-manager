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
            name TEXT NOT NULL,
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
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            breed TEXT NOT NULL,
            assignable BOOLEAN NOT NULL
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS students(
            student_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            background_info TEXT NOT NULL,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL,
            UNIQUE (name, background_info)
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
            lessons_id SERIAL PRIMARY KEY,
            range TEXT[],
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL,
            student_id INTEGER,
            CONSTRAINT fk_student FOREIGN KEY(student_id)
            REFERENCES students(student_id)
            ON DELETE SET NULL,
            horse_id INTEGER,
            CONSTRAINT fk_horse FOREIGN KEY(horse_id)
            REFERENCES horses(horse_id)
            ON DELETE SET NULL
        );`
    );

    let workHours = [{
        "start": "08:00",
        "end": "08:45",
        "assigned": false
    }, {
        "start": "08:45",
        "end": "09:30",
        "assigned": false
    }, {
        "start": "09:30",
        "end": "10:15",
        "assigned": false
    }, {
        "start": "10:15",
        "end": "11:00",
        "assigned": false
    }, {
        "start": "11:00",
        "end": "11:45",
        "assigned": false
    }, {
        "start": "11:45",
        "end": "12:30",
        "assigned": false
    }, {
        "start": "12:30",
        "end": "13:15",
        "assigned": false
    }, {
        "start": "13:15",
        "end": "14:00",
        "assigned": false
    }, {
        "start": "14:00",
        "end": "14:45",
        "assigned": false
    }, {
        "start": "14:45",
        "end": "15:30",
        "assigned": false
    }, {
        "start": "15:30",
        "end": "16:15",
        "assigned": false
    }, {
        "start": "16:15",
        "end": "17:00",
        "assigned": false
    }, {
        "start": "17:00",
        "end": "17:45",
        "assigned": false
    }, {
        "start": "17:45",
        "end": "18:30",
        "assigned": false
    }]

    /*
        I altered horses_lessons and instructors_lessons tables
        to have a default value of work_hours workHours ^^ with this sql code:
        ALTER TABLE ONLY horses_lessons ALTER COLUMN work_hours SET DEFAULT 'workHours';
        ALTER TABLE ONLY instructors_lessons ALTER COLUMN work_hours SET DEFAULT 'workHours';

        In order to add range of dates to horses_lessons and instructors_lessons tables i used this sql code:
        insert into horses_lessons ("date") 
        select generate_series('2022-09-01'::date,'2025-09-01'::date,'1 day'::interval);
        insert into instructors_lessons ("date") 
        select generate_series('2022-09-01'::date,'2025-09-01'::date,'1 day'::interval);

    */

    await client.query(
        `CREATE TABLE IF NOT EXISTS horses_lessons(
            horses_lessons_id SERIAL PRIMARY KEY,
            date Date,
            work_hours jsonb,
            horse_id INTEGER,
            CONSTRAINT fk_horse FOREIGN KEY(horse_id)
            REFERENCES horses(horse_id)
            ON DELETE SET NULL,
            UNIQUE (date, horse_id)
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS instructor_lessons(
            instructor_lessons_id SERIAL PRIMARY KEY,
            date Date,
            work_hours jsonb,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL,
            UNIQUE (work_hours, instructor_id)
        );`
    );

    console.log("create");
}

