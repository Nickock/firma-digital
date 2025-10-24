import { RegisterForm } from '../components/forms/RegisterForm'
export const Register = () => {
  return (
    <div className='p-15 max-w-xl mx-auto'>
      <h3 className='text-4xl mb-5 w-100 text-center'>Crea tu cuenta</h3>
      <RegisterForm />
    </div>
  )
}
