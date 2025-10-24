import { Navigate, Outlet } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'

export const ProtectedRoute = () => {
  const [token] = useSessionStorage('token')

  if (!token) {
    return <Navigate to='/inicio-sesion' replace />
  }
  return <Outlet />
}
