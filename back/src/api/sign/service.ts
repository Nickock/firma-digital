import { Repository } from 'typeorm'
import { AppDataSource } from '../../db/connect'
import { SignRequest } from '../../entities/SignRequest.entity'
import { ISignDocumentResponse, ISignDocumentResponseExternalApp } from './interface'
import { User } from '../../entities/User.entity'
import CryptoKey from '../../utils/keyUtils'
import crypto from 'crypto'
import { ExternalApp } from '../../entities/ExternalApp.entity'

class SignService {
  private signRepo: Repository<SignRequest>
  private userRepo: Repository<User>
  private externalAppRepo: Repository<ExternalApp>

  constructor() {
    this.signRepo = AppDataSource.getRepository(SignRequest)
    this.userRepo = AppDataSource.getRepository(User)
    this.externalAppRepo = AppDataSource.getRepository(ExternalApp)
  }

  /*Pasos:
    1) obtener privateKey del user y desencriptarla
    2) obtener la solicitud de firma registrada
    3) de la solicitud de firma tomar el doc_hash y firmarlo con clave privada del user
    4) mandar paquete firmado a api externa
    5) devolver "return_url" y mensaje descriptivo al front
  */

  async sign(userId: string, signRequestId: string): Promise<ISignDocumentResponse> {
    try {
      let finalResponse: ISignDocumentResponse = { external_success: true }

      const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['userKey'] })
      if (!user) {
        return { error: 'El usuario que intenta firmar, no existe' }
      }
      const signRequest = await this.signRepo.findOne({
        where: { id: signRequestId, isSigned: false },
        relations: ['external_app']
      })
      if (!signRequest) {
        return { error: 'Esta solicitud de firma no existe o ya fue completada' }
      }

      //desencriptar la private key del user
      const { private_key_encrypted, public_key, encryptionIv } = user.userKey
      const private_key = await CryptoKey.decryptWithHash(private_key_encrypted, encryptionIv, user.signHash)

      const { doc_hash, callback_url, return_url, external_ref } = signRequest

      //firmar doc_hash con clave privada del usuario:

      const signature = crypto.sign('sha256', Buffer.from(doc_hash), {
        key: private_key,
        type: 'pkcs8',
        format: 'pem'
      })
      const signed_doc = signature.toString('base64')

      //Crear paquete firmado para enviar a app externa.
      const { name: signer_name, surname: signer_surname } = user
      const externalAppApiKey = signRequest.external_app.api_key

      const signPackageForExternalApp: ISignDocumentResponseExternalApp = {
        signed_doc,
        doc_hash,
        public_key,
        signer_name,
        signer_surname,
        external_ref
      }

      //enviar packete a app externa
      const externalResponse = await sendExternalAppSignaturePackage(
        signPackageForExternalApp,
        externalAppApiKey,
        callback_url
      )
      if (!externalResponse.success) {
        finalResponse[
          'external_error'
        ] = `${signRequest.external_app.name} no pudo recibir la solicitud, pero su documento fue firmado`

        finalResponse.external_success = false
      }

      //Ahora completar la firma, es decir, marcarla como hecha y responder a front.

      signRequest.isSigned = true

      /*const response =*/ await this.signRepo.save(signRequest)

      finalResponse.message = 'Se ha firmado correctamente el documento'
      finalResponse.return_url = return_url

      return finalResponse
    } catch (error) {
      console.error('[SignService] sign'.bgRed)
      console.error(error)
      return { error: 'Error del servidor' }
    }
  }
}

export default new SignService()

async function sendExternalAppSignaturePackage(
  signaturePackage: ISignDocumentResponseExternalApp,
  externalApiKey: string,
  callback_url: string
) {
  try {
    const response = await fetch(callback_url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${externalApiKey}`
      },
      body: JSON.stringify(signaturePackage)
    })

    return { success: response.ok }
  } catch (error) {
    console.error('Error sending signPackage to external app'.bgRed)
    console.error(error)

    return { success: false }
  }
}
