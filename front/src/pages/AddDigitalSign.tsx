import { useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'
import { useUser } from '../hooks/useUser'
import { signHashSchema } from '../schemas/UserSchemas'
import { useNavigate } from 'react-router-dom'
export const AddDigitalSign = () => {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signDraw, setSignDraw] = useState('')
  const [confirmDialog, setConfirmDialog] = useState(false)
  const { updateSignHashData, isLoading } = useUser()

  const initSign = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const rect = canvas.getBoundingClientRect()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.beginPath()

    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000'
    setIsDrawing(true)
  }

  const doSign = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const rect = canvas.getBoundingClientRect()

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }
  const endSign = () => {
    if (!isDrawing) return
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    setSignDraw(canvas.toDataURL('image/png'))
    setIsDrawing(false)
  }
  const clearSign = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignDraw('')
  }

  const hashSign = async () => {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(signDraw)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  const handleSubmit = async () => {
    const signHash = await hashSign()
    const dataToSend = signHashSchema.safeParse({ signHash: signHash })

    if (dataToSend.success) {
      const response = await updateSignHashData(dataToSend.data)
      if (response.success) {
        toast.success('¡Hecho!', {
          style: { borderColor: '#3cbb38ff', backgroundColor: '#f5fff1ff', borderWidth: '2px' },
          description: 'Firma guardada Satisfactoriamente',
          duration: 4000
        })
        navigate('/panel')
      } else {
        toast.error('Error', {
          style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
          description: 'Hubo un error al guardar tu firma',
          duration: 4000
        })
      }
    } else {
      toast.error('Error', {
        style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
        description: 'Hubo un error al procesar tu firma',
        duration: 4000
      })
    }

    // console.log(dataToSend)
  }

  return (
    <div>
      <h3 className='text-4xl my-15'>Crea tu firma digital</h3>
      <div className='flex justify-center my-15'>
        <canvas
          width={750}
          height={500}
          ref={canvasRef}
          className='border bg-white'
          onMouseDown={initSign}
          onMouseMove={doSign}
          onMouseUp={endSign}
          onMouseLeave={endSign}
        ></canvas>
      </div>
      <div className='flex justify-around'>
        <Button onClick={clearSign} variant={'secondary'}>
          Limpiar firma
        </Button>
        <Button
          onClick={() => {
            if (signDraw != '') {
              setConfirmDialog(true)
            } else {
              toast.error('Error al guardar', {
                style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
                description: 'Debes crear tu firma',
                duration: 4000
              })
            }
          }}
          disabled={isLoading}
        >
          Guardar firma
        </Button>
      </div>

      {confirmDialog && (
        <section className='bg-[rgba(0,0,0,.3)] fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
          <div className='bg-gradient p-10 rounded-md border border-[var(--primary)]'>
            <h4 className='text-2xl'>¿Seguro que quieres continuar?</h4>
            <p className=' my-7 font-medium'>
              Una vez se suban los cambios, solo podrás volver a cambiarlos de manera presencial
            </p>
            <img src={signDraw} alt='Dibujo de la firma' />
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
                  handleSubmit()
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
