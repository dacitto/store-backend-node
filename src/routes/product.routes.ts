import express from 'express'
import ProductController from '../controllers/product.controller'
import { authorized } from '../middleware/auth.guard'
import { validateCreateRequest } from '../validators/product.validators'
const productRoute = express.Router()
const _controller = ProductController

productRoute.get('/', _controller.index)
productRoute.get('/show/:id', _controller.getProductById)
productRoute.post(
  '/create',
  authorized,
  validateCreateRequest,
  _controller.createProduct
)

export default productRoute
