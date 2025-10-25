import z from 'zod'

export const ExternalAppRegisterSchema = z.object({
  email: z.email('El email se obligatorio'),
  name: z.string('El nombre debe ser un string válido').min(5, 'El nombre debe tener al menos 5 caracteres')
})

export type ExternalAppRegisterData = z.infer<typeof ExternalAppRegisterSchema>

export const SignRequestSchema = z.object({
  doc_hash: z.string(),
  doc_id: z.uuid(),
  doc_url: z.url(),
  callback: z.url(),
  return_url: z.url(),
  description: z.string(),
  external_ref: z.string().nullable()
})

export type SignRequestData = z.infer<typeof SignRequestSchema>
