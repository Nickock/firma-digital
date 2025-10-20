import { Router } from 'express'
import { authRouter } from '../api/auth/routes'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
