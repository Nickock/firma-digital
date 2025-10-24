import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { Button } from '../components/ui/button'
import { useSign } from '../hooks/useSign'
import { toast } from 'sonner'

export const SignDocument = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const signId = searchParams.get('signId')
  const [signIdStored] = useSessionStorage('signId')
  const [confirmDialog, setConfirmDialog] = useState(false)
  const { getSignInfo } = useSign()
  const [signData, setSignData] = useState<signData>()

  //Obtiene el id de la signRequest (el guardado y/o el recibido por searchParams) y hace fetch signData
  useEffect(() => {
    const fetchSignData = async () => {
      const response = (await getSignInfo(signIdStored || signId || '')) as getSignDataResponse

      if (response && response.success) {
        setSignData(response.payload)
      } else {
        toast.error('Error obtener la información de la solicitud', {
          style: { borderColor: '#fa4545ff', backgroundColor: '#fc9c9cff', borderWidth: '2px' },
          description: 'Vuelva a intentar',
          duration: 4000
        })
        navigate('/panel')
      }
    }

    if (!signIdStored && !signId) {
      navigate('/panel')
    } else {
      // console.log('fetch sign data')
      fetchSignData()
    }
  }, [signIdStored, navigate, signId, getSignInfo])

  const handleSign = () => {
    console.log('MANDAR PETICION DE FIRMA AL BACK')
  }

  return (
    <div>
      <div className='flex flex-col gap-5 text-xl  mx-auto items-center my-10'>
        <h3 className='text-4xl mb-10 self-start'>Firma el documento:</h3>
        {signData && <p> Descripción : {signData.description}</p>}
        {signData && (
          <a
            href={signData.doc_url}
            target='_blank'
            className='text-blue-500 underline hover:text-blue-300 duration-150'
          >
            Previsualizar documento
          </a>
        )}
        <Button onClick={() => setConfirmDialog(true)}>Firmar</Button>
      </div>
      {confirmDialog && (
        <section className='bg-[rgba(0,0,0,.3)] fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
          <div className='bg-gradient p-10 rounded-md border border-[var(--primary)]'>
            <h4 className='text-2xl mb-10'>¿Seguro que quieres continuar?</h4>
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
                  handleSign()
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

type signData = {
  doc_url: string
  description: string
}
type getSignDataResponse = {
  success: boolean
  payload: signData
}

// type tokenData = {
//   app_id: string
//   callback: string
//   description: string
//   doc_hash: string
//   doc_id: string
//   doc_url: string
//   exp: number
//   iat: number
// }
