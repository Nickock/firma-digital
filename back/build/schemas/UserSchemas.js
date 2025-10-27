"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signHashSchema = exports.updateUserSchema = exports.verifyEmailSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.verifyEmailSchema = zod_1.default.object({
    verifyCode: zod_1.default.string().regex(/^\d{3}-\d{3}-\d{3}$/)
});
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, { message: 'Debes ingresar tu nombre' }),
    secondName: zod_1.default.string().nullable().optional(),
    surname: zod_1.default.string().min(3, { message: 'Debes ingresar tu apellido' }),
    secondSurname: zod_1.default.string().nullable().optional(),
    birthDate: zod_1.default.coerce.date({ message: 'Debes ingresar tu fecha de nacimiento' }),
    dni: zod_1.default.string().min(8, { message: 'Debes ingresar un dni de al menos 8 dígitos' }),
    phone: zod_1.default.string().nullable().optional() //.min(8, { message: 'Debes ingresar un teléfono de al menos 8 dígitos' })
});
exports.signHashSchema = zod_1.default.object({
    signHash: zod_1.default.string().min(64)
});
//# sourceMappingURL=UserSchemas.js.map