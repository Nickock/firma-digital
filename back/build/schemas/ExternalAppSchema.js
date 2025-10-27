"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignRequestSchema = exports.ExternalAppRegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ExternalAppRegisterSchema = zod_1.default.object({
    email: zod_1.default.email('El email se obligatorio'),
    name: zod_1.default.string('El nombre debe ser un string válido').min(5, 'El nombre debe tener al menos 5 caracteres')
});
exports.SignRequestSchema = zod_1.default.object({
    doc_hash: zod_1.default.string(),
    doc_id: zod_1.default.uuid(),
    doc_url: zod_1.default.url(),
    callback: zod_1.default.url(),
    return_url: zod_1.default.url(),
    description: zod_1.default.string(),
    external_ref: zod_1.default.string().nullable()
});
//# sourceMappingURL=ExternalAppSchema.js.map