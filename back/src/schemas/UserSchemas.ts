import z from 'zod'

export const verifyEmailSchema = z.object({
  verifyCode: z.string().regex(/^\d{3}-\d{3}-\d{3}$/)
})
export type verifyEmailData = z.infer<typeof verifyEmailSchema>

export const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'Debes ingresar tu nombre' }),
  secondName: z.string().nullable().optional(),
  surname: z.string().min(3, { message: 'Debes ingresar tu apellido' }),
  secondSurname: z.string().nullable().optional(),
  birthDate: z.coerce.date({ message: 'Debes ingresar tu fecha de nacimiento' }),
  dni: z.string().min(8, { message: 'Debes ingresar un dni de al menos 8 dígitos' }),
  phone: z.string().nullable().optional() //.min(8, { message: 'Debes ingresar un teléfono de al menos 8 dígitos' })
})

// export const userDataSchema = z.object({
//   email: z.email('Debes ingresar un email válido'),
//   name: z.string('El nombre es obligatorio').min(3, 'Debe tener al menos 3 caracteres'),
//   secondName: z.string().nullable().optional(),
//   surname: z.string('El apellido es obligatorio').min(3, 'Debe tener al menos 3 caracteres'),
//   secondSurname: z.string().nullable().optional(),
//   birthDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date('Fecha inválida')),
//   dni: z.string('El dni es obligatorio').regex(/^\d{8}$/, 'Debe tener exactamente 8 dígitos numéricos'),
//   phone: z.string().nullable().optional()
// })

export type updateUserData = z.infer<typeof updateUserSchema>

export const signHashSchema = z.object({
  signHash: z.string().min(64)
})

export type signHashData = z.infer<typeof signHashSchema>
