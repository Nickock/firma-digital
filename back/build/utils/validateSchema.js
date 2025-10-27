"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (object, schema) => {
    const result = schema.safeParse(object);
    return result;
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map