import jwt from 'jsonwebtoken'
import { IjwtPayload } from '../interfaces/Ijwt'

// export const generateToken = (payload: IjwtPayload) => {
export const generateToken = (payload: IjwtPayload): string => {
  let token = ''
  if (process.env.JWT_SECRET)
    token = jwt.sign(
      {
        id: payload.id,
        role: payload.role
      },
      process.env.JWT_SECRET,
      { expiresIn: 30 * 60 }
    )
  return token
}

export const verifyToken = (token: string) => {
  try {
    if (!process.env.JWT_SECRET) throw Error('[JWT ERROR] : No tienes clave secreta definida'.red)
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error instanceof Error) {
      console.log('[VerifyToken] : '.bgRed + error.message)
    }
  }
}
