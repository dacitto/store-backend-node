import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

// index page route  => /index , /index.html , /
export const rootRouter = router.get(
  '^/$|/index(.html)?',
  (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/views/index.html'))
  }
)
