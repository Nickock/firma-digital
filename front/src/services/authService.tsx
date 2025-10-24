import type { LoginFormData, RegisterFormData, VerifyEmailFormData } from '../schemas/AuthSchemas'

const API_URL = import.meta.env.VITE_API_URL

export const Register = async (payload: RegisterFormData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('[AuthService] Register : ', error)
  }
}

export const VerifyEmail = async (payload: VerifyEmailFormData) => {
  const token = sessionStorage.getItem('token')

  try {
    const response = await fetch(`${API_URL}/user/verifyEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('[AuthService] VerifyEmail : ', error)
  }
}

export const Login = async (payload: LoginFormData) => {
  const token = sessionStorage.getItem('token')

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('[AuthService] Login : ', error)
  }
}
