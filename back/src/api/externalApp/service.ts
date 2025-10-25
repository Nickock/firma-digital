import { Repository } from 'typeorm'
import { ExternalApp } from '../../entities/ExternalApp.entity'
import { AppDataSource } from '../../db/connect'
import { SignRequestData } from '../../schemas/ExternalAppSchema'
import { DTSignData, ISignRequestResponse } from './interfaces'
import { SignRequest } from '../../entities/SignRequest.entity'

class ExternalAppService {
  private externalAppRepo: Repository<ExternalApp>
  private signRequestRepo: Repository<SignRequest>
  constructor() {
    this.externalAppRepo = AppDataSource.getRepository(ExternalApp)
    this.signRequestRepo = AppDataSource.getRepository(SignRequest)
  }

  async existByKey(apiKey: string): Promise<{ success: boolean; id?: string }> {
    try {
      const extApp = await this.externalAppRepo.findOne({ where: { api_key: apiKey } })
      if (extApp == null) {
        return { success: false }
      }

      return { success: true, id: extApp.id }
    } catch (error) {
      console.error('ERROR [ExternalAppService:existByKey]'.bgRed)
      console.error(error)
      return { success: false }
    }
  }

  async createSignRequest(apiId: string, requestData: SignRequestData): Promise<ISignRequestResponse> {
    try {
      const extApp = await this.externalAppRepo.findOne({ where: { id: apiId } /*, relations: ['external_app']*/ })
      if (extApp == null) {
        return { error: 'Api key inválida' }
      }

      const newSignRequest = this.signRequestRepo.create({
        doc_hash: requestData.doc_hash,
        doc_id: requestData.doc_id,
        doc_url: requestData.doc_url,
        callback_url: requestData.callback,
        return_url: requestData.return_url,
        description: requestData.description,
        external_ref: requestData.external_ref,
        external_app: extApp,
        isSigned: false
        // external_app_id: extApp.id
      })

      const response = await this.signRequestRepo.save(newSignRequest)

      return { requestId: response.id }
    } catch (error) {
      if (error.code == '23505') {
        return { error: 'Ya existe una solicitud de firma para este documento' }
      }
      console.error('ERROR [ExternalAppService:createSignRequest]'.bgRed)
      console.error(error)
      return { error: 'Error del servidor' }
    }
  }

  async getSignRequestData(signRequestId: string): Promise<DTSignData | { error: string }> {
    try {
      const signRequest = await this.signRequestRepo.findOne({ where: { id: signRequestId } })
      if (signRequest == null) {
        return { error: 'No existe una solicitud de firma con ese identificador' }
      }

      // const { doc_hash, doc_id, doc_url, callback_url, return_url, description } = signRequest
      const { doc_url, description } = signRequest

      const signData: DTSignData = {
        //doc_hash,
        //doc_id,
        doc_url,
        // callback_url,
        // return_url,
        description
      }

      return signData
    } catch (error) {
      console.error('ERROR [ExternalAppService:existByKey]'.bgRed)
      console.error(error)
      return { error: 'Error del servidor' }
    }
  }
}

export default new ExternalAppService()
