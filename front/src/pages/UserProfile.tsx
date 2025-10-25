import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { userDataSchema, type userDataFormData } from '../schemas/UserSchemas'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
export const UserProfile = () => {
  const { getProfileData, updateProfileData } = useUser()
  const [userData, setUserData] = useState<userDataFormData>()
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dataToSend, setDataToSend] = useState<userDataFormData>()
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<userDataFormData>({
    resolver: zodResolver(userDataSchema),
    mode: 'onChange',
    defaultValues: userData ?? {}
  })

  //fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getProfileData()
        if ('error' in result.payload) throw new Error()
        const data = result.payload

        if (data.birthDate) {
          data.birthDate = data.birthDate.slice(0, 10)
        }

        setUserData(data as userDataFormData)
        //resetea el useForm y aplica "defaultValues" con la data de la respuesta
        reset(data as userDataFormData)
      } catch (err) {
        toast.error('Error al cargar', {
          style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
          description: 'No se pudo obtener la información de tu perfil',
          duration: 4000
        })
        console.error(err)
      }
    }

    fetchUserData()
  }, [reset, getProfileData])

  const onSubmit = async (data: userDataFormData) => {
    setDataToSend(data)
    setConfirmDialog(true)
    //submitData(data)
  }

  const submitData = async (data: userDataFormData) => {
    const res = await updateProfileData(data)
    if (res.success) {
      toast.success('¡Hecho!', {
        style: { borderColor: '#3cbb38ff', backgroundColor: '#f5fff1ff', borderWidth: '2px' },
        description: 'Datos actualizados correctamente',
        duration: 4000
      })
      navigate('/panel')
    } else {
      toast.error('Error:', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: 'No se ha podido actualizar los datos, vuelva a intentar',
        duration: 4000
      })
    }
  }

  return (
    <div>
      <h3 className='text-4xl mt-15'>Mi perfil</h3>
      <form className='grid grid-cols-1 sm:grid-cols-2 gap-5 p-10' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2 col-span-1'>
          <label>Nombre</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('name')}
            readOnly={!!userData?.name}
            style={{ border: userData?.name ? 'none' : '', outline: userData?.name ? 'none' : '' }}
            placeholder='Nombre'
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Apellido</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('surname')}
            readOnly={!!userData?.surname}
            style={{ border: userData?.surname ? 'none' : '', outline: userData?.surname ? 'none' : '' }}
            placeholder='Apellido'
          />
          {errors.surname && <p className='text-red-500 text-sm'>{errors.surname.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Segundo nombre</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('secondName', { required: false })}
            readOnly={!!userData?.secondName}
            style={{ border: userData?.secondName ? 'none' : '', outline: userData?.secondName ? 'none' : '' }}
            placeholder='Segundo nombre'
          />
          {errors.secondName && <p className='text-red-500 text-sm'>{errors.secondName.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Segundo apellido</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('secondSurname')}
            readOnly={!!userData?.secondSurname}
            style={{ border: userData?.secondSurname ? 'none' : '', outline: userData?.secondSurname ? 'none' : '' }}
            placeholder='Segundo apellido'
          />
          {errors.secondSurname && <p className='text-red-500 text-sm'>{errors.secondSurname.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Fecha de nacimiento</label>
          <input
            type='date'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('birthDate')}
            readOnly={!!userData?.birthDate}
            style={{ border: userData?.birthDate ? 'none' : '', outline: userData?.birthDate ? 'none' : '' }}
          />
          {errors.birthDate && <p className='text-red-500 text-sm'>{errors.birthDate.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Identificación</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('dni')}
            readOnly={!!userData?.dni}
            style={{ border: userData?.birthDate ? 'none' : '', outline: userData?.birthDate ? 'none' : '' }}
            placeholder='12345678'
          />
          {errors.dni && <p className='text-red-500 text-sm'>{errors.dni.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 '>
          <label>Teléfono</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('phone')}
            placeholder='Teléfono'
          />
          {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
        </div>
        <div className='flex flex-col gap-2 col-span-1 mb-15'>
          <label>Email</label>
          <input
            type='text'
            className='border rounded bg-gradient placeholder:text-gray-400 p-1'
            {...register('email')}
            readOnly
            placeholder='correo@email.com'
            style={{ border: userData?.email ? 'none' : '', outline: userData?.email ? 'none' : '' }}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>
        <Button
          variant={'secondary'}
          onClick={(e) => {
            e.preventDefault()
            navigate('/panel')
          }}
        >
          Cancelar
        </Button>
        <Button>Guardar</Button>
      </form>
      {confirmDialog && (
        <section className='bg-[rgba(0,0,0,.3)] fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
          <div className='bg-gradient p-10 rounded-md border border-[var(--primary)]'>
            <h4 className='text-2xl'>¿Seguro que quieres continuar?</h4>
            <p className=' my-7 font-medium'>
              Una vez se suban los cambios, solo podrás volver a cambiarlos de manera presencial
            </p>
            <div className='flex justify-around'>
              <Button
                variant={'secondary'}
                onClick={() => {
                  setConfirmDialog(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  if (dataToSend != null) {
                    submitData(dataToSend)
                  }
                  setConfirmDialog(false)
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
