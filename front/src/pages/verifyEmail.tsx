import { Button } from '../components/ui/button'
import { useForm } from 'react-hook-form'
import { type VerifyEmailFormData, VerifyEmailSchema } from '../schemas/AuthSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import { useUser } from '../hooks/useUser'

export const VerifyEmail = () => {
  const [countdown, setCountdown] = useState(0)
  const intervalRef = useRef<null | typeof setInterval>(null)
  const COOLDOWN_TIME = 150
  const { getNewEmailCode, isLoading } = useUser()

  const navigate = useNavigate()
  const { verifyEmail } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(VerifyEmailSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: VerifyEmailFormData) => {
    const res = await verifyEmail(data)
    if (res.success) {
      navigate('/panel')
    } else {
      toast.error('Error al verificar el email', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: res.payload.error,
        duration: 4000
      })
    }
  }

  const handleReSend = async (): Promise<void> => {
    if (countdown === 0) {
      // Ejecutar la acción
      console.log('Solicitando código...')
      const response = await getNewEmailCode()
      if (response.success) {
        toast.success('¡Hecho!', {
          style: { borderColor: '#3cbb38ff', backgroundColor: '#f5fff1ff', borderWidth: '2px' },
          description: 'Se ha enviado un nuevo código a su correo electrónico',
          duration: 4000
        })
      } else {
        toast.error('Error al reenviar el nuevo código', {
          style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
          description: 'Vuelva a intentar al finalizar la cuenta atrás',
          duration: 4000
        })
      }

      setCountdown(COOLDOWN_TIME)
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  return (
    <div className='flex flex-col gap-10 items-center'>
      <h1 className='text-4xl'>Verifica tu cuenta</h1>
      <p>Se te ha enviado un correo electrónico con el codigo de verificación.</p>
      <form className='flex flex-col gap-3 p-8 w-full max-w-md' onSubmit={handleSubmit(onSubmit)}>
        <label className='text-sm'>Código de verificacion:</label>
        <input
          type='text'
          {...register('verifyCode')}
          className='border rounded-md p-2 bg-gradient-2 focus:outline-none  placeholder:text-gray-800'
          placeholder='123-456-789'
        />
        {errors.verifyCode && <p className='text-sm text-red-500'>{errors.verifyCode.message}</p>}
        <div className='flex justify-between'>
          <Button
            variant={'secondary'}
            className='self-center my-5'
            onClick={(e) => {
              e.preventDefault()
              handleReSend()
            }}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Reintentar en ${countdown}s` : 'Solicitar código de verificación'}
          </Button>
          <Button className='self-center my-5' disabled={isLoading}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}
