import { Router } from 'express'
import apiResponse from '../../utils/apiResponse'
import { validateSchema } from '../../utils/validateSchema'
import { signHashSchema, updateUserData, updateUserSchema, verifyEmailSchema } from '../../schemas/UserSchemas'
import { HttpStatus, UserStatus } from '../../constants/enums'
import UserController from './controller'
import { statusMiddleware } from '../../middlewares/statusMiddleware'

export const userRouter = Router()

userRouter.get('/', async (req, res) => {
  const response = await UserController.getUser(res.locals.user.id)
  // const response = await UserController.getUser('4e635394-a219-4eb6-a5cc-a45ff30bd3bc')

  if (response.error) {
    res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response))
  }

  res.status(HttpStatus.OK).json(apiResponse(true, { ...response.data }))
})

userRouter.post('/verifyEmail/code', statusMiddleware([UserStatus.CREATED]), async (req, res) => {
  try {
    const userId = res.locals.user.userId
    const response = await UserController.generateNewVerifyCode(userId)

    if (!response.success) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(apiResponse(false, { error: 'No se pudo completar su solicitud.' }))
    }
    return res
      .status(HttpStatus.OK)
      .json(apiResponse(true, { message: 'Se ha enviado un correo con su nuevo código.' }))
  } catch (error) {
    console.error('ERROR'.bgRed, error)
    return res.status(HttpStatus.SERVER_ERROR).json(apiResponse(false, { message: 'Error del servidor' }))
  }
})

userRouter.post('/verifyEmail', statusMiddleware([UserStatus.CREATED]), async (req, res) => {
  try {
    const body = validateSchema(req.body, verifyEmailSchema)

    if (!body.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'codigo inválido' }))
    }
    const verifyCode = body.data?.verifyCode
    const userId = res.locals.user.id

    const response = await UserController.verifyEmail(userId, verifyCode || '')

    if (response.success) {
      return res
        .status(HttpStatus.OK)
        .json(apiResponse(true, { message: 'Su email ha sido verificado satisfactoriamente.' }))
    }

    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { error: 'Ha introducido un código inválido.' }))
  } catch (err) {
    console.error('ERROR'.bgRed, err)
    return res.status(HttpStatus.SERVER_ERROR).json(apiResponse(false, { error: 'Error del servidor' }))
  }
})

userRouter.patch(
  '/',
  statusMiddleware([UserStatus.EMAIL_VERIFIED, UserStatus.DATA_UPLOAD, UserStatus.AUNTENTIFIED, UserStatus.COMPLETED]),
  async (req, res) => {
    try {
      const body = validateSchema(req.body, updateUserSchema)

      if (!body.success) {
        console.log(body.error)
        return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, JSON.parse(body.error?.message ?? '')))
      }

      const response = await UserController.updateUser(res.locals.user.id, body.data as updateUserData)

      console.log(response)
      res
        .status(HttpStatus.CREATED)
        .json(apiResponse(true, { message: 'Usuario actualizado correctmente', data: body.data }))
    } catch (err) {
      console.error('ERROR'.bgRed)
      console.error(err)
      res.status(HttpStatus.SERVER_ERROR).json(apiResponse(false, { error: 'Error del servidor' }))
    }
  }
)

userRouter.get('/status', async (req, res) => {
  const response = await UserController.getUserStatus(res.locals.user.id)

  if (response.error) {
    res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response))
  }

  res.status(HttpStatus.OK).json(apiResponse(true, { ...response }))
  // res.status(200).json(apiResponse(true, { message: 'tuki' }))
})

userRouter.patch('/autentify', statusMiddleware([UserStatus.DATA_UPLOAD]), async (req, res) => {
  const response = await UserController.addBiometricData(res.locals.user.id)
  if (response.error) {
    res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, { ...response }))
  }

  res.status(HttpStatus.OK).json(apiResponse(true, { ...response }))
})

userRouter.patch('/sign', statusMiddleware([UserStatus.AUNTENTIFIED]), async (req, res) => {
  const body = validateSchema(req.body, signHashSchema)

  if (!body.success || body.data == undefined) {
    console.log(body.error)
    return res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, JSON.parse(body.error?.message ?? '')))
  }

  const response = await UserController.addSignHash(res.locals.user.id, body.data)
  if (response.error) {
    res.status(HttpStatus.BAD_REQUEST).json(apiResponse(false, response))
  }

  res.status(HttpStatus.OK).json(apiResponse(true, response))
})
