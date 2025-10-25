import z from 'zod'

export const signDocumentSchema = z.object({
  signRequestId: z.uuid()
})

export type signDocumentData = z.infer<typeof signDocumentSchema>
