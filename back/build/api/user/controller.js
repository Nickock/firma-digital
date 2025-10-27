"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_js_1 = __importDefault(require("./service.js"));
class UserController {
    static async getUser(userId) {
        return await service_js_1.default.getUserById(userId);
    }
    static async verifyEmail(userId, verificationCode) {
        const payload = { userId, verificationCode };
        return await service_js_1.default.verifyEmail(payload);
    }
    static async generateNewVerifyCode(userId) {
        return await service_js_1.default.generateNewVerifyCode(userId);
    }
    static async updateUser(userId, data) {
        return await service_js_1.default.updateUser(userId, data);
    }
    static async getUserStatus(userId) {
        return await service_js_1.default.getUserStatus(userId);
    }
    static async addSignHash(userId, data) {
        return await service_js_1.default.addSignHash(userId, data);
    }
    static async addBiometricData(userId) {
        return await service_js_1.default.addBiometricData(userId);
    }
}
exports.default = UserController;
//# sourceMappingURL=controller.js.map