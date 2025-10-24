const API_URL = import.meta.env.VITE_API_URL

export const getSignData = async (signId: string) => {
  try {
    const response = await fetch(`${API_URL}/external-app/sign-request`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        signId: `${signId}`
      }
    })
    const result = await response.json()
    // console.log(result)
    return result
  } catch (error) {
    console.error('[SignService] getSignData : ', error)
  }
}
