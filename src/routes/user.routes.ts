import express from 'express'
import userController from '../controllers/user.controller'
import { authorized } from '../middleware/auth.guard'
import { validateRegisterRequest } from '../validators/auth.validators'
const userRoute = express.Router()
const _controller = userController

userRoute.get('/', authorized, _controller.index)
userRoute.get('/show/:id', authorized, _controller.getUserById)
userRoute.post(
  '/create',
  authorized,
  validateRegisterRequest,
  _controller.createUser
)

export default userRoute
