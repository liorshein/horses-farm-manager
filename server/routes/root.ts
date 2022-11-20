import { Router } from 'express'
import path from 'path'

const rootRouter = Router()

rootRouter.get('^/$|index(.html)?', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'))
})

export default rootRouter
