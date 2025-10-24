import { useState } from 'react'
import type { LoginFormData, RegisterFormData, VerifyEmailFormData } from '../schemas/AuthSchemas'
import { Login, Register, VerifyEmail } from '../services/authService'
import { useSessionStorage } from './useSessionStorage'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useSessionStorage('token')

  if (token) console.log('token ok')

  const register = async (registerData: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await Register(registerData)
      if (!result.success) {
        setError(result.payload.error)
      }
      // sessionStorage.setItem('token', result.payload.token)
      setToken(result.payload.token)

      console.log('[useAuth] : register =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (verifyData: VerifyEmailFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await VerifyEmail(verifyData)
      if (!result.success) {
        setError(result.payload.error)
      }

      console.log('[useAuth] : verifyEmail =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (loginData: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await Login(loginData)
      if (!result.success) {
        setError(result.payload.error)
      }
      // sessionStorage.setItem('token', result.payload.token)
      setToken(result.payload.token)
      console.log('[useAuth] : login =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { verifyEmail, login, register, isLoading, error, clearError: () => setError(null) }
}
