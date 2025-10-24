import { LoginForm } from '../components/forms/LoginForm'

export const Login = () => {
  return (
    <div className='p-15 max-w-xl mx-auto'>
      <h3 className='text-4xl mb-5 w-100 text-center'>Inicia sesión</h3>
      <LoginForm></LoginForm>
    </div>
  )
}
