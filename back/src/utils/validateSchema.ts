import z, { ZodType } from 'zod'

export const validateSchema = <T>(
  object: unknown,
  schema: ZodType<T>
): { success: boolean; data?: T; error?: z.ZodError } => {
  const result = schema.safeParse(object)
  return result
}
