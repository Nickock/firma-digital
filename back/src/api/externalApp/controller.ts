import { SignRequestData } from '../../schemas/ExternalAppSchema'
import { DTSignData, ISignRequestResponse } from './interfaces'
import ExternalAppService from './service'
export class ExternalAppController {
  static async existByKey(apiKey: string): Promise<{ success: boolean; id?: string }> {
    return await ExternalAppService.existByKey(apiKey)
  }
  static async createSignRequest(apiId: string, data: SignRequestData): Promise<ISignRequestResponse> {
    return await ExternalAppService.createSignRequest(apiId, data)
  }
}
export class SignRequestController {
  static async getSignRequestData(id: string): Promise<DTSignData | { error: string }> {
    return await ExternalAppService.getSignRequestData(id)
  }
}
