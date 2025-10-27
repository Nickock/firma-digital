"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
class AuthController {
}
_a = AuthController;
AuthController.register = async (email, pass, confirmPass) => {
    try {
        if (pass != confirmPass) {
            return { token: '', error: 'Las contraseñas no coinciden' };
        }
        const payload = { email, pass };
        return await service_1.default.register(payload);
    }
    catch {
        return { token: '', error: 'Error del servidor' };
    }
};
AuthController.login = async (email, pass) => {
    try {
        const payload = { email, pass };
        return await service_1.default.login(payload);
    }
    catch {
        return { token: '', error: 'Error del servidor' };
    }
};
exports.default = AuthController;
//# sourceMappingURL=controller.js.map