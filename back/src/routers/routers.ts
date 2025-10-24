import { Router } from 'express'
import { authRouter } from '../api/auth/routes'
import { userRouter } from '../api/user/routes'
import { adminRouter } from '../api/admin/routes'
import { jwtMiddleware } from '../middlewares/authMiddleware'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/user', jwtMiddleware, userRouter)
apiRouter.use('/admin', jwtMiddleware, adminRouter)
