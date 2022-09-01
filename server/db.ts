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
            address TEXT NOT NULL
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
            ON DELETE SET NULL
        );`
    );

    /*  
    In order to create a table full of dates i used the sql code: 

    insert into work_days ("day") 
    select generate_series('2022-09-01'::date,'2030-09-01'::date,'1 day'::interval);
    */

    await client.query(
        `CREATE TABLE IF NOT EXISTS work_days(
            work_days_id SERIAL PRIMARY KEY,
            day DATE NOT NULL,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL
        );`
    );

    /*  
    In order to create a table full of months i used the sql code: 

    insert into work_months ("month") 
    select generate_series('2022-09-01'::date,'2030-09-01'::date,'1 month'::interval);
    */

    await client.query(
        `CREATE TABLE IF NOT EXISTS work_months(
            work_months_id SERIAL PRIMARY KEY,
            month TEXT NOT NULL,
            salary INTEGER,
            instructor_id INTEGER,
            CONSTRAINT fk_instructor FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS work_hours(
            work_hours_id SERIAL PRIMARY KEY,
            start_lesson TEXT NOT NULL,
            end_lesson TEXT NOT NULL,
            arrived BOOLEAN,
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

    console.log("create");
}

