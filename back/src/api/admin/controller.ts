import { IAuthentifyUserResponse } from './interfaces'
import AdminService from './service'
export default class AdminController {
  static async autentifyUser(idUser: string): Promise<IAuthentifyUserResponse> {
    return await AdminService.autentifyUser(idUser)
  }
}
