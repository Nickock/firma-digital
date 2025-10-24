import { Header } from './Header'
import { Footer } from './Footer'
import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
export const BasicLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen '>
      <Header />
      <main className='flex-1 max-w-6xl w-full self-center p-5'>{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}
