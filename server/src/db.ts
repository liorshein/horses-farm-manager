import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env

export const pool = new Pool({
  connectionString: DATABASE_URL,
  keepAlive: true,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.on('error', (err: any) => {
  console.log(err);
})

export const connectToDB = async () => {
  try {
    await pool.connect()
    console.log("Connected to database");
  } catch (error) {
    console.log("Unable to connect to database");
    console.log(error)
  }
}

export const initDb = async () => {
  connectToDB()

  await pool.query(
    `CREATE TABLE IF NOT EXISTS instructors(
            instructor_id SERIAL PRIMARY KEY,
            instructor_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            address TEXT NOT NULL,
            roles TEXT[] NOT NULL,
            UNIQUE (email, password, instructor_name)
        );`
  )

  await pool.query(
    `CREATE TABLE IF NOT EXISTS horses(
            horse_id SERIAL PRIMARY KEY,
            horse_name TEXT NOT NULL,
            age INTEGER NOT NULL,
            breed TEXT NOT NULL,
            assignable TEXT NOT NULL,
            UNIQUE (horse_name)
        );`
  )

  await pool.query(
    `CREATE TABLE IF NOT EXISTS students(
            student_id SERIAL PRIMARY KEY,
            student_name TEXT NOT NULL,
            id TEXT NOT NULL,
            date_of_birth TEXT NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            height TEXT NOT NULL,
            address TEXT NOT NULL,
            framework TEXT NOT NULL,
            working_on TEXT NOT NULL,
            hmo INTEGER NOT NULL,
            instructor_id INTEGER,
            FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE SET NULL,
            UNIQUE (student_name, date_of_birth, id)
        );`
  )

  await pool.query(
    `CREATE TABLE IF NOT EXISTS lessons(
            lesson_id SERIAL PRIMARY KEY,
            horse_id INTEGER NOT NULL,
            CONSTRAINT fk_horse FOREIGN KEY(horse_id)
            REFERENCES horses(horse_id)
            ON DELETE CASCADE,
            start_time TIMESTAMPTZ NOT NULL,
            end_time TIMESTAMPTZ NOT NULL,
            instructor_id INTEGER NOT NULL,
            FOREIGN KEY(instructor_id)
            REFERENCES instructors(instructor_id)
            ON DELETE CASCADE,
            student_id INTEGER NOT NULL,
            FOREIGN KEY(student_id)
            REFERENCES students(student_id)
            ON DELETE CASCADE,
            UNIQUE (horse_id, start_time, end_time)
        );`
  )

  console.log('create')
}
