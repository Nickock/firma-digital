export const validateSchema = (object, schema) => {
    const result = schema.safeParse(object);
    return result;
};
