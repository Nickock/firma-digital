// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import './index.css'
import { mainRouter } from './routes/router'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <Toaster position='top-center' />
    <RouterProvider router={mainRouter} />
  </>
  // </StrictMode>
)
