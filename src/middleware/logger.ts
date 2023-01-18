import { format } from 'date-fns'
// import {v4} from "uuid"
import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'

const fsPromises = fs.promises
export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '../..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '../..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '../..', 'logs', logFileName),
      logItem
    )
  } catch (error) {
    console.log(error)
  }
}

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = `${req.method}\t ${req.url}`
  const logFileName = 'reqLog.log'
  logEvents(message, logFileName)
  console.log(message)
  next()
}
