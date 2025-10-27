import { QueryFailedError, Repository } from 'typeorm'
import { AppDataSource } from '../../db/connect'
import { User } from '../../entities/User.entity'
import {
  DTUser,
  IAddUserBiometricDataResponse,
  IAddUserSignHashResponse,
  IGetUserResponse,
  IGetUserStatus,
  IUpdateUserResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse
} from './interfaces'
import { UserStatus } from '../../constants/enums'
import { signHashData, updateUserData } from '../../schemas/UserSchemas'
import { AuditLogActions } from '../../constants/enums'
// import AuditLogService from '../audit/service'
import AuditLogController from '../audit/controller'
import verifyEmailCode from '../../utils/verifyEmailCode'
import { sendEmail } from '../../services/mailService'
import { MailFormat } from '../../interfaces/mailFormat'
import { UserKey } from '../../entities/UserKey.entity'
import CryptoKey from '../../utils/keyUtils'

class UserService {
  private userRepo: Repository<User>
  private userKeyRepo: Repository<UserKey>
  constructor() {
    this.userRepo = AppDataSource.getRepository(User)
    this.userKeyRepo = AppDataSource.getRepository(UserKey)
  }
  async getUserById(idUser: string): Promise<IGetUserResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: idUser } })

      if (!user) {
        console.log('USER NO EXISTE')
        return { error: 'El usuario no existe' }
      }

      const { email, name, secondName, surname, secondSurname, birthDate: birthDateAux, dni, phone, status } = user
      const birthDate = birthDateAux == null ? '' : new Date(birthDateAux).toISOString()
      // console.log(birthDateAux)
      // console.log(birthDate)
      const userDT: DTUser = {
        email,
        name,
        secondName,
        surname,
        secondSurname,
        birthDate,
        dni,
        phone,
        status
      }

      return { data: userDT }
    } catch (error) {
      if (error instanceof Error) {
        console.log('[UserService]:getUserByID :'.bgRed, error.message)
      }
      return { error: 'Error del servidor' }
    }
  }
  async getUserStatus(idUser: string): Promise<IGetUserStatus> {
    try {
      const user = await this.userRepo.findOne({ where: { id: idUser } })
      if (!user) {
        console.log('USER NO EXISTE')
        return { error: 'El usuario no existe' }
      }
      const { status } = user
      return { status: status }
    } catch (error) {
      if (error instanceof Error) {
        console.log('[UserService]:getUserStatus :'.bgRed, error.message)
      }
      return { error: 'Error del servidor' }
    }
  }

  async verifyEmail(payload: IVerifyEmailPayload): Promise<IVerifyEmailResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: payload.userId } })
      if (!user) {
        return { success: false }
      }
      if (user.verificationEmailCode != payload.verificationCode || user.status != UserStatus.CREATED) {
        return { success: false }
      }
      user.status = UserStatus.EMAIL_VERIFIED

      this.userRepo.save(user)

      //Audit log
      try {
        await AuditLogController.create(payload.userId, AuditLogActions.EMAIL_VERIFICATION)
      } catch {
        console.error('No se pudo crear el auditLog de verificacion de email'.bgYellow)
      }

      return { success: true }
    } catch (error) {
      if (error instanceof Error) {
        console.log('[UserService]:verifyEmail :'.bgRed, error.message)
      }
      return { success: false }
    }
  }

  async updateUser(userId: string, data: updateUserData): Promise<IUpdateUserResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } })

      if (!user) {
        return { error: 'El usuario que intentas actualizar, no existe' }
      }

      user.name = data.name
      user.secondName = data.secondName || ''
      user.surname = data.surname
      user.secondSurname = data.secondSurname || ''
      user.birthDate = new Date(data.birthDate)
      user.dni = data.dni
      user.phone = data.phone ?? ''
      user.status = UserStatus.DATA_UPLOAD

      await this.userRepo.save(user)

      //Audit log
      try {
        await AuditLogController.create(userId, AuditLogActions.USER_DATA_UPDATED)
      } catch {
        console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow)
      }

      return { data: data }
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code == '23505') {
        return { error: 'Ya existe un usuario registrado con ese dni' }
      }

      if (error instanceof Error) {
        console.error('[UserService]:updateUser :'.bgRed, error.message)
      }
      console.error(error)
      return { error: 'Error interno' }
    }
  }

  async addSignHash(userId: string, data: signHashData): Promise<IAddUserSignHashResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['userKey'] })

      if (!user) {
        return { error: 'El usuario que intentas actualizar, no existe' }
      }

      // console.log('[DEV]:No olvides activar esta linea al terminar'.bgCyan.red)
      user.status = UserStatus.COMPLETED
      user.signHash = data.signHash

      //CREAR FIRMA DIGITAL Y SOLO ACTUALIZAR SI LA FIRMA ESTÁ OK
      const { publicKey, privateKey } = CryptoKey.generateRSAKeyPair()

      //      const publicKey = 'Public key de pruebas'
      //      const privateKey = 'Private key de pruebas'

      const { encrypted: private_key_hash, iv } = await CryptoKey.encryptWithHash(privateKey, data.signHash)

      const userKey = this.userKeyRepo.create({
        public_key: publicKey,
        private_key_encrypted: private_key_hash,
        encryptionIv: iv,
        user: user
      })

      await this.userKeyRepo.save(userKey)

      user.userKey = userKey

      await this.userRepo.save(user)

      //Audit log
      try {
        await AuditLogController.create(userId, AuditLogActions.USER_COMPLETED)
      } catch {
        console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow)
      }
      return { message: 'Se guardó la firma correctamente' }
    } catch (error) {
      if (error instanceof Error) {
        console.log('[UserService]:addSignHash :'.bgRed, error.message)
      }
      return { error: 'Error interno' }
    }
  }

  async generateNewVerifyCode(userId: string): Promise<IVerifyEmailResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } })
      if (!user) {
        return { success: false }
      }

      const newCode = verifyEmailCode()
      user.verificationEmailCode = newCode
      await this.userRepo.save(user)

      //Enviar nuevo email
      const newMail: MailFormat = {
        title: 'Codigo de verificación',
        messages: ['Tu nuevo codigo de verificación es :', newCode]
      }
      const subject = '¡Tu nuevo codigo de verificación de email está listo!'
      await sendEmail(user.email, newMail, subject)

      return { success: true }
    } catch (error) {
      console.error('[UserService]:generateNewVerifyCode()'.bgRed)
      console.error(error)
      return { success: false }
    }
  }

  async addBiometricData(userId: string): Promise<IAddUserBiometricDataResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } })

      if (!user) {
        return { error: 'El usuario que intentas actualizar, no existe' }
      }

      user.status = UserStatus.AUNTENTIFIED

      await this.userRepo.save(user)

      //Audit log
      try {
        await AuditLogController.create(userId, AuditLogActions.USER_AUNTENTIFIED)
      } catch {
        console.error('No se pudo crear el auditLog de actualizacion de usuario'.bgYellow)
      }

      return { message: 'Datos biométricos guardados correctamente' }
    } catch (error) {
      if (error instanceof Error) {
        console.log('[UserService]:addBiometricData :'.bgRed, error.message)
      }
      return { error: 'Error interno' }
    }
  }
}

export default new UserService()
