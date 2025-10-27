"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RegisterSchema = zod_1.default.object({
    email: zod_1.default.email({ message: 'Email inválido' }),
    pass: zod_1.default.string({ message: 'La contraseña debe tener al menos 8 caracteres' }).min(8),
    confirmPass: zod_1.default.string({ message: 'La contraseña debe tener al menos 8 caracteres' }).min(8)
});
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.email({ message: 'Email inválido' }),
    pass: zod_1.default.string()
});
//# sourceMappingURL=AuthSchemas.js.map