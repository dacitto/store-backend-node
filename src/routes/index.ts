import express from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import productRoute from './product.routes'

const appRouter = express.Router()

/**
 * * auth routes
 */
appRouter.use('/auth', authRoutes)
appRouter.use('/users', userRoutes)
appRouter.use('/products', productRoute)

export default appRouter
