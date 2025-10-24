import { Repository } from 'typeorm'
import { ExternalApp } from '../../entities/ExternalApp.entity'
import { AppDataSource } from '../../db/connect'
import { ExternalAppRegisterData } from '../../schemas/ExternalAppSchema'
import { IAuthExternalAppResponse } from './interfaces'
import crypto from 'crypto'

class AuthExternalAppService {
  private externalAppRepo: Repository<ExternalApp>
  constructor() {
    this.externalAppRepo = AppDataSource.getRepository(ExternalApp)
  }

  async register(payload: ExternalAppRegisterData): Promise<IAuthExternalAppResponse> {
    const extAppExist = await this.externalAppRepo.exists({ where: { email: payload.email } })
    if (extAppExist) {
      return { error: 'Ya existe una empresa registrada con ese correo' }
    }
    const newAppKey = generateAPIKey()

    const newExtApp = this.externalAppRepo.create({
      email: payload.email,
      name: payload.name,
      api_key: newAppKey
    })

    await this.externalAppRepo.save(newExtApp)

    return { apiKey: newAppKey }
  }
}

export default new AuthExternalAppService()

function generateAPIKey(length: number = 32): string {
  return crypto.randomBytes(length).toString('base64url')
}
