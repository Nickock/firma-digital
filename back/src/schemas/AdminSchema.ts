import z from 'zod'

export const autentifyUserSchema = z.object({
  userId: z.uuid()
})

export type autentifyUserData = z.infer<typeof autentifyUserSchema>
