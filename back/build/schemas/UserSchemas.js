import z from 'zod';
export const verifyEmailSchema = z.object({
    verifyCode: z.string().regex(/^\d{3}-\d{3}-\d{3}$/)
});
export const updateUserSchema = z.object({
    name: z.string().min(3, { message: 'Debes ingresar tu nombre' }),
    secondName: z.string().nullable().optional(),
    surname: z.string().min(3, { message: 'Debes ingresar tu apellido' }),
    secondSurname: z.string().nullable().optional(),
    birthDate: z.coerce.date({ message: 'Debes ingresar tu fecha de nacimiento' }),
    dni: z.string().min(8, { message: 'Debes ingresar un dni de al menos 8 dígitos' }),
    phone: z.string().nullable().optional() //.min(8, { message: 'Debes ingresar un teléfono de al menos 8 dígitos' })
});
export const signHashSchema = z.object({
    signHash: z.string().min(64)
});
