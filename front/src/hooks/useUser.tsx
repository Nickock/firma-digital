import { useCallback, useState } from 'react'
import { getUserData, updateUserData, getUserStatus, addBiometricData, addSignHashData } from '../services/userService'
import type { signHashFormData, userDataFormData } from '../schemas/UserSchemas'

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProfileData = useCallback(async (): Promise<getUserReponse> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getUserData()
      if (!result.success) {
        if ('error' in result.payload) setError(result.payload.error)
      }

      console.log('[useUser] : getData =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getProfileStatus = useCallback(async (): Promise<getProfileStatusResonse> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getUserStatus()
      if (!result.success) {
        if ('error' in result.payload) setError(result.payload.error)
      }

      console.log('[useUser] : getStatus =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfileData = async (payload: userDataFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await updateUserData(payload)
      if (!result.success) {
        if ('error' in result.payload) setError(result.payload.error)
      }

      console.log('[useUser] : updateProfileData =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateBiometricData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await addBiometricData()
      if (!result.success) {
        if ('error' in result.payload) setError(result.payload.error)
      }

      console.log('[useUser] : updateBiometricData =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }
  const updateSignHashData = async (payload: signHashFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await addSignHashData(payload)
      if (!result.success) {
        if ('error' in result.payload) setError(result.payload.error)
      }

      console.log('[useUser] : updateSignHashData =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateSignHashData,
    updateBiometricData,
    getProfileStatus,
    updateProfileData,
    getProfileData,
    isLoading,
    error,
    clearError: () => setError(null)
  }
}

export interface getUserReponse {
  success: boolean
  payload: userDataResponse | { error: string }
}
export interface getProfileStatusResonse {
  success: boolean
  payload: { status: string } | { error: string }
}

type userDataResponse = {
  email: string
  name?: string
  secondName?: string
  surname?: string
  secondSurname?: string
  birthDate?: string //"1970-01-01T00:00:00.000Z",
  dni?: string
  phone?: string
}
