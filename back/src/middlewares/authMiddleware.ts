import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../constants/enums'
import { verifyToken } from '../utils/jwtUtils'

// export interface AuthRequest extends Request {
//   user?: any;
// }

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Token no proporcionado'
      })
    }

    const token = authorizationHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
      return res.status(500)
    }

    const payload = verifyToken(token)

    if (!payload) throw Error

    res.locals.user = payload

    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    })
  }
}
