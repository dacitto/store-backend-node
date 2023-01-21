import express from 'express'
import userController from '../controllers/user.controller'
import { authorized } from '../middleware/auth.guard'
import { validateRegisterRequest } from '../validators/auth.validators'
const userRoute = express.Router()
const _controller = userController

userRoute.post('/', authorized, _controller.index)
userRoute.post('/show/:id', authorized, _controller.getUserById)
userRoute.post(
  '/create',
  authorized,
  validateRegisterRequest,
  _controller.createUser
)

export default userRoute
