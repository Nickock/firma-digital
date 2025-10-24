import { ExternalAppRegisterData } from '../../schemas/ExternalAppSchema'
import { IAuthExternalAppResponse } from './interfaces'
import AuthExternalAppService from './service'

export class AuthExternalAppController {
  static async registerApp(payload: ExternalAppRegisterData): Promise<IAuthExternalAppResponse> {
    return await AuthExternalAppService.register(payload)
  }
}
