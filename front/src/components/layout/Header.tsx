import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSessionStorage } from '../../hooks/useSessionStorage'
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { IoPersonCircleOutline, IoMenu } from 'react-icons/io5'
import { LuLayoutPanelLeft } from 'react-icons/lu'
import { MdOutlineLogout } from 'react-icons/md'

export const Header = () => {
  const [token, , clearStorage] = useSessionStorage('token')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <header className='border-b-1 h-15 items-center border-[var(--primary)] py-3 justify-between flex px-5 bg-[rgba(0,0,0,.4)]'>
      <Link to='/' className='flex gap-3 items-center'>
        <img src='./favicon.png' alt='' className='max-w-[30px]' />
        <h1 className='text-xl font-medium'>SecureID</h1>
      </Link>
      {!token ? (
        <nav className='flex gap-4'>
          <Link to='/inicio-sesion'>
            <Button className='cursor-pointer' variant={'secondary'}>
              Iniciar Sesión
            </Button>
          </Link>
          <Link to='/registro'>
            <Button className='cursor-pointer'>Registrarse</Button>
          </Link>
        </nav>
      ) : (
        <div className='relative '>
          <nav
            className='flex items-center cursor-pointer h-15'
            onClick={() => {
              setMenuOpen(!menuOpen)
            }}
          >
            <IoMenu className='text-4xl' />
            <FaAngleDown />
          </nav>
          {menuOpen && (
            <ol className=' absolute p-4 gap-1 right-[-15px] w-45 flex items-start flex-col border border-t-0 border-[var(--primary)] bg-[rgba(0,0,0,.2)]'>
              <li
                onClick={() => {
                  navigate('/panel')
                  setMenuOpen(false)
                }}
                className='flex gap-2 items-center hover:text-gray-400 cursor-pointer duration-150'
              >
                <LuLayoutPanelLeft />
                Panel principal
              </li>
              <li
                onClick={() => {
                  navigate('/panel/perfil')
                  setMenuOpen(false)
                }}
                className='flex gap-2 items-center hover:text-gray-400 cursor-pointer duration-150'
              >
                <IoPersonCircleOutline />
                Mi perfil
              </li>
              <li
                onClick={() => {
                  clearStorage()
                  // setMenuOpen(false)
                }}
                className='flex gap-2 items-center hover:text-gray-400 cursor-pointer duration-150'
              >
                <MdOutlineLogout />
                Cerrar sesión
              </li>
            </ol>
          )}
        </div>
      )}
    </header>
  )
}
