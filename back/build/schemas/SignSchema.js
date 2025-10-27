"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signDocumentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signDocumentSchema = zod_1.default.object({
    signRequestId: zod_1.default.uuid()
});
//# sourceMappingURL=SignSchema.js.map