import { Router } from 'express';
import { authRouter } from '../api/auth/routes';
import { userRouter } from '../api/user/routes';
import { adminRouter } from '../api/admin/routes';
import { jwtMiddleware } from '../middlewares/authMiddleware';
import { externalAppRouter } from '../api/externalApp/router';
import { authExternalAppRouter } from '../api/authExternalApp/router';
import { signRouter } from '../api/sign/router';
// import { externalAppMiddleware } from '../middlewares/externalAppMiddleware'
export const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', jwtMiddleware, userRouter);
apiRouter.use('/admin', jwtMiddleware, adminRouter);
apiRouter.use('/auth/external-app', authExternalAppRouter);
// apiRouter.use('/external-app', externalAppMiddleware(), externalAppRouter)
apiRouter.use('/external-app', externalAppRouter);
apiRouter.use('/sign', jwtMiddleware, signRouter);
