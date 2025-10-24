import type { ZodObject } from 'zod'

const SchemaValidator = (payload: unknown, schema: ZodObject) => {
  return schema.safeParse(payload)
}

export default SchemaValidator
