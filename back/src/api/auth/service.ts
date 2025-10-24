import { Repository } from 'typeorm'
import { AppDataSource } from '../../db/connect'
import { User } from '../../entities/User.entity'
import { IAuthResponse, IRegisterPayload } from './interfaces'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/jwtUtils'
import verifyEmailCode from '../../utils/verifyEmailCode'
import AuditLogService from '../audit/service'
import { AuditLogActions } from '../../constants/enums'

class AuthService {
  private userRepo: Repository<User>
  constructor() {
    this.userRepo = AppDataSource.getRepository(User)
  }

  async register(payload: IRegisterPayload): Promise<IAuthResponse> {
    const email = payload.email.toLocaleLowerCase().trim()

    const existUser = await this.userRepo.exists({ where: { email: email } })
    if (existUser) {
      return { token: '', error: 'Ya existe un usuario registrado con este email' }
    }

    const hashedPass = bcrypt.hashSync(payload.pass, bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS)))

    // let verifyCode = ''
    // for (let i = 1; i <= 11; i++) {
    //   if (i % 4 == 0) {
    //     verifyCode += '-'
    //   } else {
    //     verifyCode += getRandomInt(0, 9)
    //   }
    // }

    const verifyCode = verifyEmailCode()

    const newUser = await this.userRepo.save({ email: email, pass_hash: hashedPass, verificationEmailCode: verifyCode })

    const { id, role, status } = newUser

    //Audit log
    try {
      await AuditLogService.create(id, AuditLogActions.USER_CREATED)
    } catch {
      console.error('No se pudo crear el auditLog de registro'.bgRed)
    }

    const token = generateToken({ id: id, role: role, status: status })

    return { token: token, code: verifyCode }
  }

  async login(payload: IRegisterPayload): Promise<IAuthResponse> {
    const email = payload.email.toLocaleLowerCase().trim()

    const existUser = await this.userRepo.findOne({ where: { email: email } })
    if (!existUser) {
      return { token: '', error: 'Credenciales incorrectas' }
    }
    const { id, role, pass_hash, status } = existUser

    const validPass = bcrypt.compareSync(payload.pass, pass_hash)

    if (!validPass) {
      return { token: '', error: 'Credenciales incorrectas' }
    }

    const token = generateToken({ id: id, role: role, status: status })

    return { token: token }
  }
}

export default new AuthService()
