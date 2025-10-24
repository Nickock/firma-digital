import { useCallback, useState } from 'react'
import { getSignData } from '../services/signService'

export const useSign = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getSignInfo = useCallback(async (signId: string): Promise<unknown> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getSignData(signId)

      console.log('[useSign] : getSignInfo =>', result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { getSignInfo, isLoading, error, clearError: () => setError(null) }
}
