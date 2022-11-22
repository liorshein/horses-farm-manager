import { RequestHandler } from 'express'
import { pool } from '../db'
import bcrypt from 'bcrypt'

export const signUp: RequestHandler = async (req, res) => {
  const { email, password, phone_number, address, name } = req.body

  // Check for duplicates in DB
  const foundUser = await pool.query(
    `SELECT * FROM instructors WHERE email = $1`,
    [email]
  )
  if (foundUser.rowCount !== 0)
    return res.status(409).json({
      message: 'Email already exists, please try again with a different email',
    })

  try {
    bcrypt.genSalt().then(async (salt) => {
      const hash = await bcrypt.hash(password, salt)
      pool.query(
        `INSERT INTO instructors(instructor_name, email, password, phone_number, address, roles)
                VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, email, hash, phone_number, address, ['User']]
      )
      res.status(201).json({ message: `New user created!` })
    })
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
}
