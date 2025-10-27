import z from 'zod'

export const userDataSchema = z.object({
  email: z.email('Debes ingresar un email válido'),
  name: z.string('El nombre es obligatorio').min(3, 'Debe tener al menos 3 caracteres'),
  secondName: z.string().nullable().optional(),
  surname: z.string('El apellido es obligatorio').min(3, 'Debe tener al menos 3 caracteres'),
  secondSurname: z.string().nullable().optional(),
  //birthDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date('Fecha inválida')),
  birthDate: z.string(),
  dni: z.string('El dni es obligatorio').regex(/^\d{8}$/, 'Debe tener exactamente 8 dígitos numéricos'),
  phone: z.string().nullable().optional()
})

export type userDataFormData = z.infer<typeof userDataSchema>

export const signHashSchema = z.object({
  signHash: z.string().min(64)
})

export type signHashFormData = z.infer<typeof signHashSchema>
