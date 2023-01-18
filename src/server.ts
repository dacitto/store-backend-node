import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import db from './database'
// import routes from "./routes";
import appConf from './config/app.config'

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
app.use(cors(), express.json())

// Routes
// app.use("/api", routes);
app.get('/', function (req: Request, res: Response) {
  res.send('Hello Worlsd!')
})
// Start the server
app.listen(port, () => {
  console.log(`${appConf.name} Server is running on port: ${port}`)
})

export default app
