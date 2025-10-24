import z from 'zod'

export const RegisterSchema = z
  .object({
    email: z.email('El email es obligatorio'),
    pass: z
      .string()
      .min(1, 'La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      ),
    confirmPass: z.string()
  })
  .refine((data) => data.pass === data.confirmPass, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPass']
  })

export type RegisterFormData = z.infer<typeof RegisterSchema>

export const VerifyEmailSchema = z.object({
  verifyCode: z
    .string()
    .min(1, 'El código es obligatorio')
    .regex(/^\d{3}-\d{3}-\d{3}$/, 'Formato inválido. Use: 123-456-789')
})

export type VerifyEmailFormData = z.infer<typeof VerifyEmailSchema>

export const LoginSchema = z.object({
  email: z.email('Debes ingresar un email válido.'),
  pass: z.string().min(1, 'La contraseña es obligatoria')
})

export type LoginFormData = z.infer<typeof LoginSchema>
