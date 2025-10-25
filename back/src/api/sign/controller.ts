import { ISignDocumentResponse } from './interface'

import SignService from './service'

export class SignController {
  static async signDocument(userId: string, signRequestId: string): Promise<ISignDocumentResponse> {
    return SignService.sign(userId, signRequestId)
  }
}
