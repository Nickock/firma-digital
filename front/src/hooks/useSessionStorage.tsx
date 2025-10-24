import { useEffect, useState } from 'react'

export const useSessionStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(() => {
    return sessionStorage.getItem(key)
  })

  useEffect(() => {
    const handleStorageChange = () => {
      setValue(sessionStorage.getItem(key))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  const setStoredValue = (newValue: string | null) => {
    if (newValue === null) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.setItem(key, newValue)
    }
    setValue(newValue)
    // Disparar evento para otras pestañas
    window.dispatchEvent(new Event('storage'))
  }

  const clearStorage = () => {
    sessionStorage.clear()
    window.dispatchEvent(new Event('storage'))
  }

  return [value, setStoredValue, clearStorage] as const
}
