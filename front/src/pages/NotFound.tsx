import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-[50vh] flex flex-col items-center  justify-center gap-15'>
      <h3 className='text-6xl text-[var(--secondary)] text-center'>Página no encontrada</h3>
      <p className='text-8xl text-gradient-2'>404</p>
      <Button
        variant={'secondary'}
        onClick={() => {
          navigate('/panel')
        }}
      >
        Volver al inicio
      </Button>
    </div>
  )
}
