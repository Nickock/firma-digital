import UserService from './service.js'

import {
  IVerifyEmailPayload,
  IVerifyEmailResponse,
  IUpdateUserResponse,
  IGetUserResponse,
  IGetUserStatus,
  IAddUserSignHashResponse,
  IAddUserBiometricDataResponse
} from './interfaces'
import { signHashData, updateUserData } from '../../schemas/UserSchemas.js'

export default class UserController {
  static async getUser(userId: string): Promise<IGetUserResponse> {
    return await UserService.getUserById(userId)
  }

  static async verifyEmail(userId: string, verificationCode: string): Promise<IVerifyEmailResponse> {
    const payload: IVerifyEmailPayload = { userId, verificationCode }
    return await UserService.verifyEmail(payload)
  }

  static async generateNewVerifyCode(userId: string): Promise<IVerifyEmailResponse> {
    return await UserService.generateNewVerifyCode(userId)
  }

  static async updateUser(userId: string, data: updateUserData): Promise<IUpdateUserResponse> {
    return await UserService.updateUser(userId, data)
  }

  static async getUserStatus(userId: string): Promise<IGetUserStatus> {
    return await UserService.getUserStatus(userId)
  }

  static async addSignHash(userId: string, data: signHashData): Promise<IAddUserSignHashResponse> {
    return await UserService.addSignHash(userId, data)
  }

  static async addBiometricData(userId: string): Promise<IAddUserBiometricDataResponse> {
    return await UserService.addBiometricData(userId)
  }
}
