import { useEffect, useState } from 'react'
// import { getUserStatus } from '../utils/decodeToken'
import { formatUserStatus, formatUserStatusColor, getUserStatusStep } from '../utils/formatUserStatus'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { toast } from 'sonner'
import { ImSpinner8 } from 'react-icons/im'

export const UserPanel = () => {
  const navigate = useNavigate()
  // const userStatus = getUserStatus()
  const [userStatus, setUserStatus] = useState('')
  const [userStep, setUserStep] = useState(getUserStatusStep(userStatus))
  const [isLoading, setIsLoading] = useState(true)

  const { getProfileStatus } = useUser()

  //fetch user status
  useEffect(() => {
    const fetchUserStatus = async () => {
      setIsLoading(true)
      try {
        const result = await getProfileStatus()
        if ('error' in result.payload) throw new Error()
        const data = result.payload

        setUserStatus(data.status)
        setUserStep(getUserStatusStep(data.status))
      } catch (err) {
        toast.error('Error al cargar', {
          style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
          description: 'No se pudo obtener la información de tu perfil',
          duration: 4000
        })
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserStatus()
  }, [getProfileStatus])

  const navigateToStep = (step: number): void => {
    // console.log('navigate to' + step)
    switch (step) {
      case 2:
        navigate('/verificar-email')
        break
      case 3:
        navigate('/panel/perfil')
        break
      case 4:
        navigate('/panel/datos-biometricos')
        break
      case 5:
        navigate('/panel/adjunta-firma')
    }
  }

  return (
    <div className=' flex flex-col items-center'>
      <div className='flex flex-col '>
        <h3 className='text-4xl flex items-center'>
          Estado de tu cuenta:
          {isLoading ? (
            <span
              className='text-[var(--primary)] font-medium text-center ml-5  animate-spin '
              style={{ color: formatUserStatusColor(userStatus) }}
            >
              <ImSpinner8 />
            </span>
          ) : (
            <span
              className='text-[var(--primary)] font-medium text-center ml-5'
              style={{ color: formatUserStatusColor(userStatus) }}
            >
              [{formatUserStatus(userStatus)}]
            </span>
          )}
        </h3>
        {!isLoading && (
          <section className='flex flex-col justify-center'>
            {userStep < 5 ? (
              <div>
                <div className='relative'>
                  {userStep >= 1 && <div className='absolute w-full h-[5px] top-0 bottom-0 m-auto bg-gradient'></div>}
                  <p className='text-2xl flex items-center justify-between gap-15 '>
                    <span className='text-8xl text-gradient '>1</span>
                    Crear tu cuenta
                    {userStep >= 1 ? (
                      <span>Listo.</span>
                    ) : (
                      <Button
                        onClick={() => {
                          navigateToStep(1)
                        }}
                      >
                        Pendiente
                      </Button>
                    )}
                  </p>
                </div>
                <div className='relative'>
                  {userStep >= 2 && <div className='absolute w-full h-[5px] top-0 bottom-0 m-auto bg-gradient'></div>}
                  <p className='text-2xl flex items-center justify-between gap-15 '>
                    <span className='text-8xl text-gradient '>2</span>
                    Verificar tu correo
                    {userStep >= 2 ? (
                      <span>Listo.</span>
                    ) : (
                      <Button
                        onClick={() => {
                          navigateToStep(2)
                        }}
                      >
                        Pendiente
                      </Button>
                    )}
                  </p>
                </div>
                <div className='relative'>
                  {userStep >= 3 && <div className='absolute w-full h-[5px] top-0 bottom-0 m-auto bg-gradient'></div>}
                  <p className='text-2xl flex items-center justify-between gap-15 '>
                    <span className='text-8xl text-gradient '>3</span>
                    Adjuntar tus datos personales
                    {userStep >= 3 ? (
                      <span>Listo.</span>
                    ) : (
                      <Button
                        onClick={() => {
                          navigateToStep(3)
                        }}
                      >
                        Pendiente
                      </Button>
                    )}
                  </p>
                </div>
                <div className='relative'>
                  {userStep >= 4 && <div className='absolute w-full h-[5px] top-0 bottom-0 m-auto bg-gradient'></div>}
                  <p className='text-2xl flex items-center justify-between gap-15 '>
                    <span className='text-8xl text-gradient '>4</span>
                    Datos biométricos
                    {userStep >= 4 ? (
                      <span>Listo.</span>
                    ) : (
                      <Button
                        onClick={() => {
                          navigateToStep(4)
                        }}
                      >
                        Pendiente
                      </Button>
                    )}
                  </p>
                </div>
                <div className='relative'>
                  {userStep >= 5 && <div className='absolute w-full h-[5px] top-0 bottom-0 m-auto bg-gradient'></div>}
                  <p className='text-2xl flex items-center justify-between gap-15 '>
                    <span className='text-8xl text-gradient '>5</span>
                    Crea tu firma
                    {userStep >= 5 ? (
                      <span>Listo.</span>
                    ) : (
                      <Button
                        onClick={() => {
                          navigateToStep(5)
                        }}
                      >
                        Pendiente
                      </Button>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <Button
                className='my-15 text-xl py-8 self-center'
                onClick={() => {
                  navigate('/panel/firmar-documento')
                }}
              >
                Ir a firmar
              </Button>
            )}
            <p className='text-4xl flex items-center self-center justify-between gap-15 '>¡Listo!</p>
          </section>
        )}
      </div>
    </div>
  )
}
