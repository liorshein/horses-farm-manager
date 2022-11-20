import { RequestHandler } from 'express'
import { client } from '../db'

//* ------------------------------------------------------------- Admin related controllers ----------------------------------------------------------------------------------------

//* Data mutation -------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addLesson: RequestHandler = async (req, res) => {
  // Check if there are conflict with other lessons (same instructor)  
  try {
    const instructorLessons = (
      await client.query(
        `SELECT *
        FROM lessons
        WHERE (lessons.start_time <= $1 
          AND lessons.end_time >= $2 
          AND lessons.instructor_id=$3) 
        OR (lessons.start_time >= $1 
          AND lessons.end_time <= $2 
          AND lessons.instructor_id=$3)`,
        [req.body.start_time, req.body.end_time, req.body.instructor_id])
    ).rows

    // If there is any conflict, returns error message
    if (instructorLessons.length > 0) {
      return res.status(409).json({ message: 'Lesson overlaps another' })
    }

    // Check if there are conflict with other lessons (using the same horse, different instructors)
    const othersLessons = (
      await client.query(
        `SELECT *
        FROM lessons
        WHERE (lessons.start_time <= $1 
          AND lessons.end_time >= $2 
          AND lessons.horse_id=$3) 
        OR (lessons.start_time >= $1 
          AND lessons.end_time <= $2 
          AND lessons.horse_id=$3)`,
        [req.body.start_time, req.body.end_time, req.body.horse_id])
    ).rows

    // If there is any conflict, returns error message
    if (othersLessons.length > 0) {
      return res.status(409).json({ message: 'Horse is not available, contact farm management' })
    }

    // Otherwise, adding lesson
    const result = await client.query(
      `INSERT INTO lessons(horse_id, start_time, end_time, instructor_id, student_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING lesson_id`,
      [
        req.body.horse_id,
        req.body.start_time,
        req.body.end_time,
        req.body.instructor_id,
        req.body.student_id,
      ])
    res.send(result)

  } catch (error) {
    res.status(409).send({ message: 'Error occurred, please contact farm management.' })
  }
}

export const editLesson: RequestHandler = async (req, res) => {
  try {
    // Check if there are conflict with other lessons (using the same horse, different instructors)
    const othersLessons = (
      await client.query(
        `SELECT *
        FROM lessons
        WHERE (lessons.start_time <= $1 
          AND lessons.end_time >= $2 
          AND lessons.horse_id=$3) 
        OR (lessons.start_time >= $1 
          AND lessons.end_time <= $2 
          AND lessons.horse_id=$3)`,
        [req.body.start_time, req.body.end_time, req.body.horse_id])
    ).rows

    // If there is any conflict, returns error message
    if (othersLessons.length > 0) {
      return res.status(409).json({ message: 'Horse is not available, contact farm management' })
    }

    // Otherwise, updates lesson
    await client.query(
      `UPDATE lessons
      SET start_time=$1, end_time=$2
      WHERE lesson_id=$3`,
      [req.body.start_time, req.body.end_time, req.body.lesson_id]
    )

    res.status(200).json({ message: 'Lesson updated successfully' })
  } catch (error) {
    res.status(409).json({ message: 'Cannot update lesson, please try again or contact farm management' })
  }
}

export const deleteLesson: RequestHandler = async (req: any, res) => {
  try {
    const lessonId = req.query.lesson_id
    const result = await client.query(`DELETE FROM lessons WHERE lesson_id=$1`, [lessonId])
    res.status(200).json({ result: result, message: 'Lesson deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: "Could not delete lesson, please try again or contact farm management." })
  }
}

export const addStudent: RequestHandler = async (req: any, res) => {
  try {
    await client.query(
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
    )

    res.status(200).json({ message: "Student added successfully" })
  } catch (error) {
    res.status(409).json({ message: "Error occurred, please try again or contact the farm management" })
  }
}

export const editStudent: RequestHandler = async (req, res) => {
  try {
    await client.query(
      `UPDATE students
      SET student_name=$1, id=$2, date_of_birth=$3, age=$4, weight=$5, height=$6, address=$7, framework=$8, working_on=$9, hmo=$10, instructor_id=$11
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
    )

    res.status(200).json({ message: "Student updated successfully" })
  } catch (error) {
    res.status(409).json({ message: "Error occurred, please try again or contact the farm management" })
  }
}

export const deleteStudent: RequestHandler = async (req: any, res) => {
  const studentId = req.query.student_id
  try {
    await client.query(`DELETE FROM students WHERE student_id=$1`, [studentId])
    res.status(200).json({ message: "Student deleted successfully" })
  } catch (error) {
    res.status(409).json({ message: "Error occurred, please try again or contact the farm management" })
  }
}

//TODO - Adding error handling for horses editing, removing and adding
export const addHorse: RequestHandler = async (req: any, res) => {
  await client.query(
    `INSERT INTO horses(horse_name, age, breed, assignable)
    VALUES ($1, $2, $3, $4)`, [req.body.horse_name, req.body.age, req.body.breed, req.body.assignable]
  )

  res.send({ success: true })
}

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
  )

  res.send(result)
}

export const deleteHorse: RequestHandler = async (req: any, res) => {
  const horseId = req.query.horse_id
  await client.query(`DELETE FROM horses WHERE horse_id=$1`, [horseId])
  res.send({ success: true })
}

//* Data fetching --------------------------------------------------------------------------------------------------------------------------------------------------------------

// Fetches students data per user id
export const getStudentsData: RequestHandler = async (req: any, res) => {
  const InstructorId = req.query.instructor_id
  const result = (
    await client.query('SELECT * FROM students WHERE instructor_id = $1', [Number(InstructorId)])
  ).rows
  res.send({ result })
}

// Fetches all students data
export const getAllStudentsData: RequestHandler = async (_req, res) => {
  const result = (
    await client.query(
      `SELECT students.*, instructors.instructor_name
        FROM students
        LEFT JOIN instructors ON students.instructor_id = instructors.instructor_id`
    )
  ).rows
  res.send({ result })
}

// Fetches lessons data in format of {count, month + year}
export const getLessonsPerMonth: RequestHandler = async (_req, res) => {
  const result = await client.query(
    `SELECT COUNT (lessons.*),trim(TO_CHAR(end_time, 'Month')) || ', ' || trim(TO_CHAR(end_time, 'yyyy')) as mydate, instructors.instructor_name
    FROM lessons
    JOIN instructors ON lessons.instructor_id = instructors.instructor_id
    GROUP BY mydate, instructors.instructor_name`
  )
  res.send({ result })
}

// Fetches instructors data except admin
export const getAllInstructorsData: RequestHandler = async (_req, res) => {
  const result = (
    await client.query(`SELECT * FROM instructors WHERE instructor_id > 1`)
  ).rows
  res.send({ result })
}

// Fetches data of horses that are assignable
export const getAvailableHorses: RequestHandler = async (_req, res) => {
  const result = (
    await client.query("SELECT * FROM horses WHERE assignable='True'")
  ).rows
  res.send({ result })
}
