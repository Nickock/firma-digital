import { createBrowserRouter } from 'react-router-dom'
import { Landing } from '../pages/Landing'
import { NotFound } from '../pages/NotFound'
import { Register } from '../pages/Register'
import { BasicLayout } from '../components/layout/Layout'
import { Login } from '../pages/Login'
import { VerifyEmail } from '../pages/verifyEmail'
import { UserPanel } from '../pages/UserPanel'
import { UserProfile } from '../pages/UserProfile'
import { ProtectedRoute } from '../components/protectRoute'
import { BiometricDataPanel } from '../pages/BiomtricDataPanel'
import { AddDigitalSign } from '../pages/AddDigitalSign'
import { SignDocument } from '../pages/SignDocument'

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <BasicLayout>
        <NotFound />
      </BasicLayout>
    ),
    element: (
      <BasicLayout>
        <Landing />
      </BasicLayout>
    )
    // element: <Landing />
  },
  {
    path: '/registro',
    element: (
      <BasicLayout>
        <Register />
      </BasicLayout>
    )
  },
  {
    path: '/inicio-sesion',
    element: (
      <BasicLayout>
        <Login />
      </BasicLayout>
    )
  },

  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/verificar-email',
        element: (
          <BasicLayout>
            <VerifyEmail />
          </BasicLayout>
        )
      },
      // {
      //   path: '/panel',
      //   element: <BasicLayout />,
      //   children: [
          
          
      //     el /> },
          
      //   ]
      // },
      { path: "/panel/", element:  <BasicLayout ><UserPanel /></BasicLayout> },
      { path: '/panel/perfil', element: <BasicLayout> <UserProfile /> </BasicLayout>},
      { path: '/panel/datos-biometricos', element: <BasicLayout><BiometricDataPanel/></BasicLayout> },
      { path: '/panel/adjunta-firma', element: <BasicLayout><AddDigitalSign /></BasicLayout> },
      { path: '/panel/firmar-documento', element: <BasicLayout ><SignDocument /></BasicLayout> }

    ]
  }
])
