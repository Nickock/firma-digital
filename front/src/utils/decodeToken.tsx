import { jwtDecode } from 'jwt-decode'

export const decodeToken = () => {
  const token = sessionStorage.getItem('token')
  try {
    const tokenData = jwtDecode(token || '')
    return tokenData
  } catch {
    return {}
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
