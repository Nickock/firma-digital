import { toast } from 'sonner'
import { Button } from '../components/ui/button'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export const BiometricDataPanel = () => {
  const { updateBiometricData, isLoading } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const response = await updateBiometricData()
    if (!response.success) {
      toast.error('Error al adjuntar datos biométricos', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: 'Ya tienes datos biométricos adjuntos',
        duration: 4000
      })
    } else {
      toast.success('¡Hecho!', {
        style: { borderColor: '#3cbb38ff', backgroundColor: '#f5fff1ff', borderWidth: '2px' },
        description: 'Datos biométricos actualizados correctamente',
        duration: 4000
      })
      navigate('/panel')
    }
  }

  return (
    <div>
      <h1 className='text-5xl mt-10 mb-15'>Datos biométricos</h1>
      <div className='text-2xl flex flex-col gap-3 mb-10'>
        <p>Este paso se hace de manera presencial, usted debe agendar una cita en uno de nuestros locales SecureID</p>
        <p>Allí, se le tomaran sus datos personales nuevamente, asi como recopilar sus huellas dactiláres</p>
        <p>Esto garantiza el no repudio de la firma digital, y una correcta autentificación</p>
        <p>Por motivos de la simulación de NoCountry, este paso se reducirá a hacer click en el siguiente botón:</p>
      </div>

      <Button
        disabled={isLoading}
        className='text-xl p-10'
        onClick={() => {
          handleSubmit()
        }}
      >
        Auntentificarse con datos biométricos
      </Button>
    </div>
  )
}
