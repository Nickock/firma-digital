"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthExternalAppController = void 0;
const service_1 = __importDefault(require("./service"));
class AuthExternalAppController {
    static async registerApp(payload) {
        return await service_1.default.register(payload);
    }
}
exports.AuthExternalAppController = AuthExternalAppController;
//# sourceMappingURL=controller.js.map