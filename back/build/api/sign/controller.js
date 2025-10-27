"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignController = void 0;
const service_1 = __importDefault(require("./service"));
class SignController {
    static async signDocument(userId, signRequestId) {
        return service_1.default.sign(userId, signRequestId);
    }
}
exports.SignController = SignController;
//# sourceMappingURL=controller.js.map