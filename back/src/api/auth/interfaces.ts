export interface IRegisterPayload {
  email: string
  pass: string
}

export interface IAuthResponse {
  token: string
  error?: string
}
