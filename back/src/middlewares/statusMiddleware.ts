import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../constants/enums'
import { UserStatus } from '../constants/enums'

import UserController from '../api/user/controller'
import apiResponse from '../utils/apiResponse'

export const statusMiddleware = (status: UserStatus[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log('el array status es : ', status)
    const userStatus = (await UserController.getUserStatus(res.locals.user.id)).status
    // const user = await UserController.getUserStatus(res.locals.user.id)
    console.log(userStatus)
    // if (!status.find((s) => s == res.locals.user.status)) {
    if (!status.find((s) => s == userStatus)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json(apiResponse(false, { message: 'No tienes permisos de realizar esta accion' }))
    }
    next()
  }
}
