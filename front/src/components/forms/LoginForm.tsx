import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, type LoginFormData } from '../../schemas/AuthSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange'
  })

  const { login, isLoading } = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    const res = await login(data)
    if (res.success) {
      navigate('/panel')
    } else {
      toast.error('Error al registrarse', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: res.payload.error,
        duration: 4000
      })
    }
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-1'>
        <label>Email</label>
        <input
          type='text'
          className='border rounded-md p-2 bg-gradient-2 focus:outline-none'
          placeholder='Ingresa tu email'
          {...register('email')}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label>Contraseña</label>
        <div className='flex border items-center rounded-md p-2 bg-gradient-2 w-full '>
          <input
            type={showPass ? 'text' : 'password'}
            className='w-full focus:outline-none'
            placeholder='Ingresa tu contraseña'
            {...register('pass')}
          />
          <div
            className='text-xl cursor-pointer'
            onClick={() => {
              setShowPass(!showPass)
            }}
          >
            {showPass ? <IoIosEyeOff /> : <IoIosEye />}
          </div>
        </div>
        {errors.pass && <p className='text-red-500 text-sm'>{errors.pass.message}</p>}
      </div>
      <Button variant={'secondary'} className='mt-4' disabled={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  )
}
