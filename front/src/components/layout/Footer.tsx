export const Footer = () => {
  return (
    <footer className='flex flex-col border-t-1 items-center border-[var(--secondary-dark)] bg-[rgba(0,0,0,.4)] p-5 py-10 gap-8 text-[var(--primary)]'>
      <ol className='flex gap-15'>
        <li className='cursor-pointer hover:underline'>Política de privacidad</li>
        <li className='cursor-pointer hover:underline'>Política de privacidad</li>
        <li className='cursor-pointer hover:underline'>Política de privacidad</li>
      </ol>
      <p className='cursor-default'> @2025 SecureID. Todos los derechos reservados.</p>
    </footer>
  )
}
