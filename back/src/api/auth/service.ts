import { Repository } from 'typeorm'
import { AppDataSource } from '../../db/connect'
import { User } from '../../entities/User.entity'
import { IAuthResponse, IRegisterPayload } from './interfaces'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/jwtUtils'

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

    const newUser = await this.userRepo.save({ email: email, pass_hash: hashedPass })

    const { id, role } = newUser

    const token = generateToken({ id: id, role: role })

    return { token: token }
  }

  async login(payload: IRegisterPayload): Promise<IAuthResponse> {
    const email = payload.email.toLocaleLowerCase().trim()

    const existUser = await this.userRepo.findOne({ where: { email: email } })
    if (!existUser) {
      return { token: '', error: 'Credenciales incorrectas' }
    }
    const { id, role, pass_hash } = existUser

    const validPass = bcrypt.compareSync(payload.pass, pass_hash)

    if (!validPass) {
      return { token: '', error: 'Credenciales incorrectas' }
    }

    const token = generateToken({ id: id, role: role })

    return { token: token }
  }
}

export default new AuthService()
