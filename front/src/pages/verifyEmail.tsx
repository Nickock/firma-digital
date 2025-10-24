import { Button } from '../components/ui/button'
import { useForm } from 'react-hook-form'
import { type VerifyEmailFormData, VerifyEmailSchema } from '../schemas/AuthSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const VerifyEmail = () => {
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

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-4xl'>Verifica tu cuenta</h1>
      <p>Se te ha enviado un correo electrónico con el codigo de verificación.</p>
      <form className='flex flex-col gap-3 p-8' onSubmit={handleSubmit(onSubmit)}>
        <label className='text-sm'>Código de verificacion:</label>
        <input
          type='text'
          {...register('verifyCode')}
          className='border rounded-md p-2 bg-gradient-2 focus:outline-none  placeholder:text-gray-800'
          placeholder='123-456-789'
        />
        {errors.verifyCode && <p className='text-sm text-red-500'>{errors.verifyCode.message}</p>}
        <Button variant={'secondary'} className='self-center my-5'>
          Enviar
        </Button>
      </form>
    </div>
  )
}
