import { useEffect, useState } from 'react'
// import { getUserStatus } from '../utils/decodeToken'
import { getUserStatusStep } from '../utils/formatUserStatus'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { toast } from 'sonner'

export const UserPanel = () => {
  const navigate = useNavigate()
  // const userStatus = getUserStatus()
  const [userStatus, setUserStatus] = useState('')
  const [userStep, setUserStep] = useState(getUserStatusStep(userStatus))

  const { getProfileStatus } = useUser()

  //fetch user status
  useEffect(() => {
    const fetchUserStatus = async () => {
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
      }
    }

    fetchUserStatus()
  }, [getProfileStatus])

  const navigateToStep = (step: number): void => {
    console.log('navigate to' + step)
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
        <h3 className='text-4xl mt-10 mb-15'>Estado de tu cuenta {userStatus}</h3>

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

      <p className='text-4xl my-15 flex items-center justify-between gap-15 '>¡Listo!</p>

      {/* <p>{formatedUserStatus}</p> */}
    </div>
  )
}
