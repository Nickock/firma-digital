import { updateUserData } from '../../schemas/UserSchemas'

export interface IVerifyEmailResponse {
  success: boolean
}
export interface IVerifyEmailPayload {
  userId: string
  verificationCode: string
}

export interface IUpdateUserResponse {
  data?: updateUserData
  error?: string
}
export interface IAddUserBiometricDataResponse {
  message?: string
  error?: string
}
export interface IAddUserSignHashResponse {
  message?: string
  error?: string
}

export interface DTUser {
  email: string
  name: string
  secondName?: string
  surname: string
  secondSurname?: string
  birthDate: string | Date
  dni: string
  phone: string
  status?: string
}

export interface IGetUserResponse {
  data?: DTUser
  error?: string
}

export interface IGetUserStatus {
  status?: string
  error?: string
}
