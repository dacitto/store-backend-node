import express from 'express'
import { authorized } from '../middleware/auth.guard'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'

const appRouter = express.Router()

/**
 * * auth routes
 */
appRouter.use('/auth', authRoutes)
appRouter.use('/users', userRoutes)

export default appRouter
