import express from 'express'
import OrderController from '../controllers/order.controller'
import { authorized } from '../middleware/auth.guard'
import { validateCreateRequest } from '../validators/order.validators'
const orderRoute = express.Router()
const _controller = OrderController

orderRoute.get('/', authorized, _controller.index)
orderRoute.get('/show/:id', authorized, _controller.getOrderById)
orderRoute.post(
  '/create',
  authorized,
  validateCreateRequest,
  _controller.createOrder
)
orderRoute.get(
  '/ordersByUser/:userId',
  authorized,
  _controller.getOrderByUserId
)

export default orderRoute
