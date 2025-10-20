import { IAuthResponse, IRegisterPayload } from './interfaces'
import AuthService from './service'

export default class AuthController {
  static register = async (email: string, pass: string, confirmPass: string): Promise<IAuthResponse> => {
    try {
      if (pass != confirmPass) {
        return { token: '', error: 'Las contraseñas no coinciden' }
      }
      const payload: IRegisterPayload = { email, pass }

      return await AuthService.register(payload)
    } catch {
      return { token: '', error: 'Error del servidor' }
    }
  }

  static login = async (email: string, pass: string): Promise<IAuthResponse> => {
    try {
      const payload: IRegisterPayload = { email, pass }
      return await AuthService.login(payload)
    } catch {
      return { token: '', error: 'Error del servidor' }
    }
  }
}
