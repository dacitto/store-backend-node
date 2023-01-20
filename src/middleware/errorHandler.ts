import { logEvents } from './logger'
import { Request, Response, NextFunction } from 'express'
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `${err.name}: ${err.message} -- ${req.method}\t ${req.url}\t ${req.headers.origin}`
  const logFileName = 'errorLog.log'
  logEvents(message, logFileName)

  console.log(err.stack)
  const status = 500

  res.status(status).json({ message: 'something was wrong ⛔' })
  next()
}
