import z from 'zod';
export const signDocumentSchema = z.object({
    signRequestId: z.uuid()
});
