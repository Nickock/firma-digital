import { Router } from 'express'
import { validateSchema } from '../../utils/validateSchema'
import { LoginData, LoginSchema, RegisterData, RegisterSchema } from '../../schemas/AuthSchemas'
import apiResponse from '../../utils/apiResponse'
import AuthController from './controller'
import { HttpStatus } from '../../constants/enums'
import { sendWelcomeEmail } from '../../services/mailService'

export const authRouter = Router()

authRouter.get('/register', (_, res) => {
  res.json({ email: 'ingrese email', pass: 'ingrese pass', confirmPass: 'ingrese confirmPass' })
})

authRouter.post('/register', async (req, res) => {
  const body = validateSchema(req.body, RegisterSchema)

  if (!body.success) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(apiResponse(false, { message: JSON.parse(body.error?.message ?? '') }))
  }

  const { email, pass, confirmPass } = body.data as RegisterData

  const response = await AuthController.register(email, pass, confirmPass)
  if (response.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: response.error }))
  }
  const verificationCode = response.code
  if (verificationCode) {
    await sendWelcomeEmail(email, verificationCode)
  }
  return res.status(HttpStatus.OK).json(apiResponse(true, { token: response.token }))
})

authRouter.post('/login', async (req, res) => {
  const body = validateSchema(req.body, LoginSchema)
  if (!body.success) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(apiResponse(false, { message: JSON.parse(body.error?.message ?? '') }))
  }
  const { email, pass } = body.data as LoginData

  const response = await AuthController.login(email, pass)

  if (response.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response))
  }

  return res.status(HttpStatus.OK).json(apiResponse(true, response))
})
