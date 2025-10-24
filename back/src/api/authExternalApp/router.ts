import { Router } from 'express'
import { HttpStatus } from '../../constants/enums'
import apiResponse from '../../utils/apiResponse'
import { validateSchema } from '../../utils/validateSchema'
import { ExternalAppRegisterData, ExternalAppRegisterSchema } from '../../schemas/ExternalAppSchema'
import { AuthExternalAppController } from './controller'

export const authExternalAppRouter = Router()

authExternalAppRouter.post('/register', async (req, res) => {
  const body = validateSchema(req.body, ExternalAppRegisterSchema)

  if (!body.success) {
    let errorMessage: string

    if (body.error) {
      if (typeof body.error === 'string') {
        errorMessage = body.error
      } else if (body.error instanceof Error) {
        errorMessage = body.error.message
      } else {
        errorMessage = JSON.stringify(body.error)
      }
    } else {
      errorMessage = 'Verifica tu información'
    }
    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, JSON.parse(errorMessage)))
  }
  const response = await AuthExternalAppController.registerApp(body.data as ExternalAppRegisterData)

  if (response.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response))
  }
  return res.status(HttpStatus.CREATED).json(apiResponse(true, response))
})
