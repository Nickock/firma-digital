import { Button } from '../components/ui/button'
import { IoShieldOutline, IoFingerPrintOutline, IoKeyOutline } from 'react-icons/io5'
export const Landing = () => {
  return (
    <>
      <div
        style={{
          background: 'url("public/landingBg2.webp")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className='p-15 my-8 rounded-xl shadow'
      >
        <h1 className='text-7xl my-15 text-shadow-lg'>SecureID: Tu identidad digital, simplificada</h1>
        <p className='my-10 text-xl'>
          SecureID te provee de una plataforma robusta y de uso amigable para administrar tu identidad digital.
        </p>
        <Button variant={'secondary'}>Comenzar ahora</Button>
      </div>
      <h2 className='text-3xl font-medium my-3'>Caracteristicas principales</h2>
      <p className='mb-7'>
        SecureID offers a range of features designed to enhance your digital security and streamline your online
        interactions. → SecureID ofrece una variedad de funciones diseñadas para mejorar tu seguridad digital y
        optimizar tus interacciones en línea.
      </p>

      <div className='flex gap-8'>
        <div className='flex  flex-col bg-[var(--primary)] bg-gradient hover:scale-105 duration-150 max-w-xs p-4 gap-2 rounded-md shadow-xl shadow-[rgba(255,255,255,.1)]'>
          <IoShieldOutline className='text-xl ' />
          <h3 className='font-bold text-[var(--secondary)]'>Seguridad Mejorada</h3>
          <p>
            Nuestra plataforma emplea cifrado de última generación y autenticación multifactor para proteger tus datos
            personales.
          </p>
        </div>
        <div className='flex  flex-col bg-[var(--primary)] bg-gradient-2 hover:scale-105 duration-150 ax-w-xs p-4 gap-2 rounded-md shadow-xl shadow-[rgba(255,255,255,.1)]'>
          <IoKeyOutline className='text-xl ' />
          <h3 className='font-bold text-[var(--secondary)]'>Acceso Fluido</h3>
          <p>Disfruta de acceso rápido y fácil a tus cuentas en línea con un único inicio de sesión seguro.</p>
        </div>
        <div className='flex  flex-col bg-[var(--primary)] bg-gradient hover:scale-105 duration-150 max-w-xs p-4 gap-2 rounded-md shadow-xl shadow-[rgba(255,255,255,.1)]'>
          <IoFingerPrintOutline className='text-xl ' />
          <h3 className='font-bold text-[var(--secondary)]'>Autenticación Biométrica</h3>
          <p>
            Utiliza métodos de autenticación biométrica, como huella digital o reconocimiento facial, para una capa
            adicional de seguridad
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-8 items-center my-20'>
        <h4 className='text-3xl'> ¿Listo para Tomar el Control de tu Identidad Digital?</h4>
        <p>
          Únete a miles de usuarios que confían en SecureID para gestionar su presencia en línea de forma segura y
          eficiente.
        </p>
        <Button>Comenzar</Button>
      </div>
    </>
  )
}
