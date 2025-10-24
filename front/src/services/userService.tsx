import type { signHashFormData, userDataFormData } from '../schemas/UserSchemas'

const API_URL = import.meta.env.VITE_API_URL

export const getUserData = async () => {
  const token = sessionStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[UserService] getUserData : ', error)
  }
}

export const getUserStatus = async () => {
  const token = sessionStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/user/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[UserService] getUserStatus : ', error)
  }
}

export const updateUserData = async (data: userDataFormData) => {
  const token = sessionStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[UserService] updateUserData : ', error)
  }
}

export const addBiometricData = async () => {
  const token = sessionStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/user/autentify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[UserService] addBiometricData : ', error)
  }
}

export const addSignHashData = async (data: signHashFormData) => {
  const token = sessionStorage.getItem('token')
  try {
    const response = await fetch(`${API_URL}/user/sign`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[UserService] addSignHashData : ', error)
  }
}
