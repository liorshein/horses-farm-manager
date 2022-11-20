import { RequestHandler } from 'express'

export const logOut: RequestHandler = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.token) return res.sendStatus(204)

  // Delete cookies from browser
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}
