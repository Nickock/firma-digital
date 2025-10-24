import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useEffect, useState } from 'react'

export const ProtectedRoute = () => {
  const [token] = useSessionStorage('token')
  const [searchParams] = useSearchParams()
  const signRequestId = searchParams.get('signId')
  const [, setStoredSignId] = useSessionStorage('signId')
  const [hasStoredSignId, setHasStoredSignId] = useState(false)

  //Guarda idSign de la solicitud de firma por si redirecciona a login
  useEffect(() => {
    if (signRequestId && !hasStoredSignId) {
      setStoredSignId(signRequestId)
      setHasStoredSignId(true)
    }
  }, [signRequestId, hasStoredSignId, setStoredSignId])

  if (!token) {
    return <Navigate to={`/inicio-sesion`} replace />
  }

  return <Outlet />
}
