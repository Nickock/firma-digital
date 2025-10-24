import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../constants/enums'

import apiResponse from '../utils/apiResponse'
import { ExternalAppController } from '../api/externalApp/controller'

export const externalAppMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'Api Key no proporcionada' }))
      }

      const apiKey = authorizationHeader.split(' ')[1]

      const externalApp = await ExternalAppController.existByKey(apiKey)

      if (!externalApp.success) {
        return res.status(HttpStatus.FORBIDDEN).json(apiResponse(false, { error: 'Api key inválida' }))
      }

      res.locals.app = { key: apiKey, id: externalApp.id }

      next()
    } catch (error) {
      console.error(error)
      return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'Api Key no proporcionada' }))
    }
  }
}
