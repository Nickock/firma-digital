import { Request, Response, NextFunction } from 'express'
import { HttpStatus, UserRole } from '../constants/enums'
import apiResponse from '../utils/apiResponse'

export const roleMiddleware = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // console.log('el array roles es : ', roles)
    // console.log('El user : ', res.locals.user)

    if (!roles.find((role) => role == res.locals.user.role)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json(apiResponse(false, { message: 'No tienes permisos de realizar esta accion' }))
    }
    next()
  }
}
