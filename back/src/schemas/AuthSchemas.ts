import z from 'zod'

export const RegisterSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  pass: z.string({ message: 'La contraseña debe tener al menos 8 caracteres' }).min(8),
  confirmPass: z.string({ message: 'La contraseña debe tener al menos 8 caracteres' }).min(8)
})

export type RegisterData = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  pass: z.string()
})
export type LoginData = z.infer<typeof LoginSchema>
