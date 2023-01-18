import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import db from './database'
import path from 'path'
// import routes from "./routes";
import appConf from './config/app.config'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'
import rootRouter from './routes/root'

// ! test data base connection
try {
  db.connect()
  console.log('DB connected ...')
} catch (error) {
  console.log(error)
}

const app: Application = express()
const port = appConf.port || 3000

// Defaul middlewares
app.use(logger)
app.use(cors(), express.json())

// Routes
app.use(express.static('public'))
app.use('/', rootRouter)
// app.use("/api", routes);
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})
// Not found pages
app.all('*', (req: Request, res: Response) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../public/views/404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

// Start the server
app.listen(port, () => {
  console.log(`${appConf.name} Server is running on port: ${port}`)
})

export default app
