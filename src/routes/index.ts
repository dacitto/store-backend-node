import express from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import productRoute from './product.routes'
import orderRoute from './order.routes'
const appRouter = express.Router()

appRouter.use('/auth', authRoutes)
appRouter.use('/users', userRoutes)
appRouter.use('/products', productRoute)
appRouter.use('/orders', orderRoute)

export default appRouter
