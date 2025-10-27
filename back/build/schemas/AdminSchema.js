"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autentifyUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.autentifyUserSchema = zod_1.default.object({
    userId: zod_1.default.uuid()
});
//# sourceMappingURL=AdminSchema.js.map