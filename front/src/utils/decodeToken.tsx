import { jwtDecode } from 'jwt-decode'

interface jwtDecoded {
  id: string
  status?: string
}
export const decodeToken = () => {
  const token = sessionStorage.getItem('token')
  try {
    const tokenData = jwtDecode(token || '')
    return tokenData as jwtDecoded
  } catch {
    return { status: '' }
  }
}

export const getUserStatus = () => {
  let userStatus = 'No se pudo obtener el estado de tu cuenta.'

  const tokenData = decodeToken()
  if (tokenData.status) {
    userStatus = tokenData.status
  }

  return userStatus
}
