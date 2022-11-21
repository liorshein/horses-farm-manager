import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { client } from '../db'
dotenv.config()

export const verifyJWT = (req: any, res: any, next: () => void) => {
  const token = req.cookies.token
  jwt.verify(
    token,
    process.env.TOKEN_SECRET!,
    async (err: any, decoded: any) => {
      if (err)
        return res
          .status(403)
          .json({ message: 'Invalid user, please login again' }) //invalid token
      req.user = decoded.id
      const foundUser = await client.query(
        `SELECT * FROM instructors WHERE instructor_id = $1`,
        [decoded.id]
      )
      const roles = foundUser.rows[0].roles
      req.roles = roles
      next()
    }
  )
}
