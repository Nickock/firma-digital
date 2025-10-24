import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { RegisterSchema, type RegisterFormData } from '../../schemas/AuthSchemas'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { IoIosEyeOff, IoIosEye } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
export const RegisterForm = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const { register: registerUser, isLoading, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: RegisterFormData) => {
    const res = await registerUser(data)
    console.log(res)
    if (res.success) {
      navigate('/verificar-email')
    }
  }

  useEffect(() => {
    if (error)
      toast.error('Error al registrarse', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: error,
        duration: 4000
      })
  }, [error])

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
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
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
        {errors.pass && <p className='text-red-500'>{errors.pass.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <label>Confirmar contraseña</label>
        <input
          type={showPass ? 'text' : 'password'}
          className='border rounded-md p-2 bg-gradient-2 focus:outline-none'
          placeholder='Confirma tu contraseña'
          {...register('confirmPass')}
        />
        {errors.confirmPass && <p className='text-red-500'>{errors.confirmPass.message}</p>}
      </div>
      <Button variant={'secondary'} className='mt-4' disabled={isLoading}>
        Registrarse
      </Button>
    </form>
  )
}
